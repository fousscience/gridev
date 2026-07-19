"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm({ defaultSubject = "" }: { defaultSubject?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Échec de l’envoi");
      }
      setStatus("success");
      setMessage("Message envoyé. Nous vous répondrons rapidement.");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Nom
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded-xl border border-[var(--line)] bg-white/70 px-4 py-3 outline-none focus:border-[var(--brand-indigo)]"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-[var(--line)] bg-white/70 px-4 py-3 outline-none focus:border-[var(--brand-indigo)]"
        />
      </div>
      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-medium">
          Sujet
        </label>
        <input
          id="subject"
          name="subject"
          defaultValue={defaultSubject}
          required
          className="w-full rounded-xl border border-[var(--line)] bg-white/70 px-4 py-3 outline-none focus:border-[var(--brand-indigo)]"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full rounded-xl border border-[var(--line)] bg-white/70 px-4 py-3 outline-none focus:border-[var(--brand-indigo)]"
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
        {status === "loading" ? "Envoi…" : "Envoyer"}
      </button>
      {message ? (
        <p
          role="status"
          className={`text-sm ${status === "success" ? "text-[var(--accent-green)]" : "text-[var(--accent-red)]"}`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
