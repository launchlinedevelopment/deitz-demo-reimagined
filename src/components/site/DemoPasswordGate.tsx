import { useState, type FormEvent } from "react";
import { Lock } from "lucide-react";
import { useDemoAccess } from "@/lib/demo-access";
import { DemoEnvironmentLabel } from "./DemoChrome";

export function DemoPasswordGate() {
  const { attempt } = useDemoAccess();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!attempt(value)) {
      setError("Incorrect demo password. Please try again.");
      setValue("");
    }
  }

  return (
    <div className="container-page section-y">
      <div className="card-surface mx-auto max-w-lg p-7 sm:p-10">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-surface text-navy-deep">
          <Lock aria-hidden="true" className="h-5 w-5" />
        </span>
        <h2 className="mt-5 text-2xl">Private Demo Access</h2>
        <p className="mt-3 text-[0.98rem] text-muted-foreground">
          This entire site is a private website redesign concept created by Launchline Development.
          Enter the demo password to view it.
        </p>

        <form onSubmit={onSubmit} noValidate className="mt-7 space-y-3">
          <label htmlFor="demo-password" className="block text-sm font-semibold text-navy-deep">
            Demo password
          </label>
          <input
            id="demo-password"
            type="password"
            autoComplete="off"
            className="field-input"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError("");
            }}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "demo-password-error" : undefined}
          />
          {error && (
            <p id="demo-password-error" role="alert" className="text-sm font-medium text-destructive">
              {error}
            </p>
          )}
          <button type="submit" className="btn-primary w-full">
            Access Demo
          </button>
        </form>

        <div className="mt-7 border-t border-border pt-6">
          <DemoEnvironmentLabel />
          <p className="mt-3 text-xs text-muted-foreground">
            This gate exists only to keep a sales demonstration private. It is not production-grade
            security, and no information entered in this demo is transmitted or stored.
          </p>
        </div>
      </div>
    </div>
  );
}
