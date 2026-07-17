"use client";

import { FormEvent, useId, useState } from "react";

type FormState =
  | { status: "idle"; message: string }
  | { status: "loading"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const IDLE_STATE: FormState = { status: "idle", message: "" };

export default function WaitlistForm({
  source,
  compact = false,
}: {
  source: string;
  compact?: boolean;
}) {
  const generatedId = useId();
  const inputId = `${generatedId}-email`;
  const messageId = `${generatedId}-message`;
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>(IDLE_STATE);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem("email") as HTMLInputElement;

    if (!input.checkValidity()) {
      input.focus();
      setFormState({
        status: "error",
        message: "Enter a valid email address.",
      });
      return;
    }

    setFormState({ status: "loading", message: "Joining the waitlist…" });

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        setFormState({
          status: "error",
          message: result.error || "Something went wrong. Please try again.",
        });
        return;
      }

      setEmail("");
      setFormState({
        status: "success",
        message:
          result.message ||
          "You’re on the list. We’ll share the next Otis update with you.",
      });
    } catch {
      setFormState({
        status: "error",
        message: "Something went wrong. Please try again.",
      });
    }
  }

  const isLoading = formState.status === "loading";

  return (
    <form
      className={`waitlist-form${compact ? " waitlist-form--compact" : ""}`}
      onSubmit={submit}
      noValidate
    >
      <div className="waitlist-control">
        <label className="sr-only" htmlFor={inputId}>
          Email address
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (formState.status !== "idle") setFormState(IDLE_STATE);
          }}
          aria-describedby={messageId}
          aria-invalid={formState.status === "error"}
          required
          maxLength={254}
          disabled={isLoading || formState.status === "success"}
        />
        <button
          type="submit"
          disabled={isLoading || formState.status === "success"}
        >
          <span>
            {formState.status === "success"
              ? "You’re in"
              : isLoading
                ? "Joining…"
                : "Join the waitlist"}
          </span>
          <span aria-hidden="true">
            {isLoading ? <span className="button-spinner" /> : "↗"}
          </span>
        </button>
      </div>
      <p
        id={messageId}
        className={`form-message form-message--${formState.status}`}
        role={formState.status === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {formState.message || "Private beta updates only. No noise."}
      </p>
    </form>
  );
}
