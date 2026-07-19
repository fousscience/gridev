"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const WELCOME_TEXT =
  "Bonjour ! Je suis Sara, l’assistante virtuelle de GRIDév. Bienvenue sur notre site — en quoi puis-je vous aider ?";

const SESSION_DISMISSED_KEY = "gridev-sara-dismissed";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: WELCOME_TEXT },
  ]);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_DISMISSED_KEY) === "1") return;
    } catch {
      /* sessionStorage indisponible */
    }

    const timer = window.setTimeout(() => {
      setOpen(true);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [open, messages, loading]);

  function closeChat() {
    setOpen(false);
    try {
      sessionStorage.setItem(SESSION_DISMISSED_KEY, "1");
    } catch {
      /* sessionStorage indisponible */
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const withUser: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(withUser);
    setInput("");
    setLoading(true);
    setError("");

    const historyForApi = withUser.filter(
      (m, i) => !(i === 0 && m.role === "assistant" && m.content === WELCOME_TEXT),
    );

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyForApi }),
      });
      const data = (await res.json()) as { ok?: boolean; reply?: string; error?: string };
      if (!res.ok || !data.ok || !data.reply) {
        throw new Error(data.error || "Échec de la réponse");
      }
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply! }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open ? (
        <div
          id="gridev-chat"
          className="animate-fade-up flex h-[min(520px,70vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface-elevated)] shadow-2xl"
          role="dialog"
          aria-label="Sara, assistante GRIDév"
        >
          <header className="flex items-center justify-between bg-[var(--brand-indigo)] px-4 py-3 text-white">
            <div>
              <p className="font-display text-base font-semibold">Sara</p>
              <p className="text-xs text-white/75">Assistante GRIDév</p>
            </div>
            <button
              type="button"
              onClick={closeChat}
              className="rounded-full px-2 py-1 text-lg leading-none hover:bg-white/15"
              aria-label="Fermer le chat"
            >
              ×
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-4">
            {messages.map((m, i) => (
              <div
                key={`${m.role}-${i}-${m.content.slice(0, 12)}`}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-[var(--brand-indigo)] text-white"
                      : "bg-white text-[var(--brand-ink)] shadow-sm"
                  }`}
                >
                  {m.content}
                </p>
              </div>
            ))}
            {loading ? (
              <p className="text-xs text-[var(--brand-muted)]">Sara rédige…</p>
            ) : null}
            {error ? (
              <p className="text-xs text-[var(--accent-red)]" role="alert">
                {error}
              </p>
            ) : null}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={onSubmit} className="border-t border-[var(--line)] bg-white/80 p-3">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Votre question…"
                maxLength={2000}
                disabled={loading}
                className="min-w-0 flex-1 rounded-full border border-[var(--line)] px-4 py-2 text-sm outline-none focus:border-[var(--brand-indigo)]"
                aria-label="Message"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="btn btn-primary shrink-0 px-4 py-2 text-sm disabled:opacity-50"
              >
                Envoyer
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => {
          if (open) {
            closeChat();
          } else {
            setOpen(true);
          }
        }}
        className="btn btn-primary shadow-lg"
        aria-expanded={open}
        aria-controls="gridev-chat"
      >
        {open ? "Fermer" : "Parler à Sara"}
      </button>
    </div>
  );
}
