"use client";

import { useActionState } from "react";
import { Anker } from "@/components/Anker";
import { anmelden, type LoginErgebnis } from "./aktion";

export default function LoginSeite() {
  const [ergebnis, formAction, pending] = useActionState<
    LoginErgebnis,
    FormData
  >(anmelden, null);

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-md border border-accent/30 bg-accent/10">
            <Anker className="size-5 text-accent" />
          </span>
          <span className="font-display text-h3">Klickhafen CRM</span>
        </div>

        <h1 className="mt-8 font-display text-h2">Anmelden</h1>
        <p className="mt-3 text-small text-ink-soft">
          Mit E-Mail und Passwort. Den Zugang legst du in Supabase an.
        </p>

        <form action={formAction} className="mt-8 flex flex-col gap-3">
          <label htmlFor="email" className="sr-only">
            E-Mail-Adresse
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="username"
            placeholder="kontakt@klickhafen.com"
            className="rounded-md border border-line-strong bg-paper-sunk px-4 py-3 text-small text-ink outline-none placeholder:text-ink-faint focus-visible:border-accent"
          />
          <label htmlFor="passwort" className="sr-only">
            Passwort
          </label>
          <input
            id="passwort"
            name="passwort"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Passwort"
            className="rounded-md border border-line-strong bg-paper-sunk px-4 py-3 text-small text-ink outline-none placeholder:text-ink-faint focus-visible:border-accent"
          />
          <button
            type="submit"
            disabled={pending}
            className="rounded-md border border-accent bg-accent px-5 py-3 text-small font-medium text-accent-ink transition-colors hover:bg-accent-hover disabled:opacity-60"
          >
            {pending ? "Wird geprüft …" : "Anmelden"}
          </button>
        </form>

        {ergebnis?.fehler && (
          <p role="status" className="mt-4 text-small text-red-400">
            {ergebnis.fehler}
          </p>
        )}
      </div>
    </div>
  );
}
