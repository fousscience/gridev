import { NextResponse } from "next/server";
import { GRIDEV_CHAT_SYSTEM_PROMPT } from "@/lib/chat-context";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 2000;

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Le chat n’est pas encore configuré (OPENROUTER_API_KEY manquant). Redémarrez le serveur après avoir ajouté la clé dans .env.local.",
      },
      { status: 503 },
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0) {
    return NextResponse.json({ ok: false, error: "Message requis." }, { status: 400 });
  }

  const sanitized = messages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({
      role: m.role,
      content: m.content.trim().slice(0, MAX_CONTENT_LENGTH),
    }));

  if (sanitized.length === 0 || sanitized[sanitized.length - 1]?.role !== "user") {
    return NextResponse.json({ ok: false, error: "Dernier message invalide." }, { status: 400 });
  }

  const model = process.env.OPENROUTER_MODEL?.trim() || "openai/gpt-4o-mini";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60_000);

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": siteUrl,
        "X-Title": "ONG GRIDev Assistant",
      },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        max_tokens: 800,
        messages: [
          { role: "system", content: GRIDEV_CHAT_SYSTEM_PROMPT },
          ...sanitized,
        ],
      }),
    }).finally(() => clearTimeout(timeout));

    const raw = await res.text();
    let data: {
      choices?: Array<{ message?: { content?: string } }>;
      error?: { message?: string } | string;
    } = {};
    try {
      data = raw ? JSON.parse(raw) : {};
    } catch {
      return NextResponse.json(
        {
          ok: false,
          error: `Réponse OpenRouter non JSON (${res.status}).`,
        },
        { status: 502 },
      );
    }

    if (!res.ok) {
      const msg =
        typeof data.error === "string"
          ? data.error
          : data.error?.message || `Erreur OpenRouter (${res.status})`;
      return NextResponse.json({ ok: false, error: msg }, { status: 502 });
    }

    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return NextResponse.json(
        { ok: false, error: "Réponse vide du modèle." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, reply });
  } catch (err) {
    const message =
      err instanceof Error
        ? err.name === "AbortError"
          ? "Délai dépassé en contactant OpenRouter."
          : err.message
        : "Impossible de joindre le service de chat.";
    console.error("[api/chat]", err);
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
