import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Mail, MapPin, Phone, Printer } from "lucide-react";
import { firm } from "@/lib/firm";
import { submitContactMessage } from "@/lib/contact.functions";
import { DemoEnvironmentLabel } from "./DemoChrome";

type Fields = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const emptyFields: Fields = { name: "", email: "", phone: "", service: "", message: "" };

const SERVICES = ["Accounting", "Taxation", "Financial Services", "Business Services", "Other"];

function validate(fields: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (!fields.name.trim()) errors.name = "Please enter your full name.";
  if (!fields.email.trim()) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim()))
    errors.email = "Please enter a valid email address, for example name@example.com.";
  if (!fields.service) errors.service = "Please choose the service you need.";
  if (!fields.message.trim()) errors.message = "Please tell us briefly how we can help.";
  else if (fields.message.trim().length > 2000) errors.message = "Please keep your message under 2000 characters.";
  return errors;
}

export function ContactExperience() {
  const send = useServerFn(submitContactMessage);
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  function update<K extends keyof Fields>(key: K, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate(fields);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = document.getElementById(`field-${Object.keys(next)[0]}`);
      first?.focus();
      return;
    }
    setSending(true);
    setSendError("");
    try {
      await send({ data: fields });
      setFields(emptyFields);
      setSubmitted(true);
    } catch {
      setSendError("We couldn't send your message just now. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="container-page section-y">
        <div className="card-surface mx-auto max-w-xl p-8 text-center sm:p-12">
          <span className="mx-auto inline-flex h-14 w-14 animate-in items-center justify-center rounded-full bg-surface text-navy-deep zoom-in duration-500">
            <CheckCircle2 aria-hidden="true" className="h-7 w-7 text-gold" />
          </span>
          <h2 className="mt-6 text-2xl" role="status">
            Your Inquiry Has Been Received
          </h2>
          <p className="mt-4 text-muted-foreground">
            Your message has been delivered to the firm's private message inbox.
          </p>
          <p className="mt-3 font-medium text-navy-deep">
            A member of the firm can review and respond to it from the administration area.
          </p>
          <Link to="/" className="btn-primary mt-8">
            Return to Website
          </Link>
          <div className="mt-8 border-t border-border pt-6">
            <DemoEnvironmentLabel />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page section-y grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
      <div>
        <DemoEnvironmentLabel />
        <h2 className="mt-6 text-3xl md:text-4xl">Request a Consultation</h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Tell us a little about what you need. Your message is saved securely and appears in the
          firm's private message inbox.
        </p>

        <form onSubmit={onSubmit} noValidate className="mt-9 space-y-6">
          <Field id="name" label="Full Name" required error={errors.name}>
            <input
              id="field-name"
              className="field-input"
              autoComplete="name"
              maxLength={100}
              value={fields.name}
              onChange={(e) => update("name", e.target.value)}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "error-name" : undefined}
            />
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="email" label="Email Address" required error={errors.email}>
              <input
                id="field-email"
                type="email"
                className="field-input"
                autoComplete="email"
                maxLength={255}
                value={fields.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "error-email" : undefined}
              />
            </Field>
            <Field id="phone" label="Phone Number" error={errors.phone}>
              <input
                id="field-phone"
                type="tel"
                className="field-input"
                autoComplete="tel"
                maxLength={30}
                value={fields.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </Field>
          </div>

          <Field id="service" label="Service Needed" required error={errors.service}>
            <select
              id="field-service"
              className="field-input"
              value={fields.service}
              onChange={(e) => update("service", e.target.value)}
              aria-invalid={errors.service ? true : undefined}
              aria-describedby={errors.service ? "error-service" : undefined}
            >
              <option value="">Select a service</option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>

          <Field id="message" label="Message" required error={errors.message}>
            <textarea
              id="field-message"
              rows={6}
              className="field-input resize-y"
              maxLength={2000}
              value={fields.message}
              onChange={(e) => update("message", e.target.value)}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? "error-message" : undefined}
            />
          </Field>

          {sendError && (
            <p role="alert" className="text-sm font-medium text-destructive">
              {sendError}
            </p>
          )}

          <button type="submit" className="btn-primary w-full sm:w-auto" disabled={sending}>
            {sending ? "Sending…" : "Send Inquiry"}
          </button>
        </form>
      </div>

      <aside className="space-y-6">
        <div className="card-surface p-7">
          <h3 className="text-xl">Office</h3>
          <ul className="mt-5 space-y-4 text-[0.98rem]">
            <li className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-gold" />
              <a href={firm.mapsUrl} target="_blank" rel="noreferrer" className="link-quiet">
                {firm.address.street}
                <br />
                {firm.address.city}, {firm.address.state} {firm.address.zip}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-gold" />
              <a href={firm.phoneHref} className="font-semibold text-navy-deep">
                {firm.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Printer aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-gold" />
              <span className="text-muted-foreground">Fax: {firm.fax}</span>
            </li>
            <li className="flex gap-3">
              <Mail aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-gold" />
              <span className="text-muted-foreground">
                Email address to be supplied by the firm before launch.
              </span>
            </li>
          </ul>
        </div>

        <div className="overflow-hidden rounded-[calc(var(--radius)+4px)] border border-border shadow-card">
          <iframe
            title="Map of 42 East Main Street, Freehold, NJ"
            src={firm.mapEmbed}
            loading="lazy"
            className="h-72 w-full border-0"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </aside>
    </div>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean | undefined;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`field-${id}`} className="mb-2 block text-sm font-semibold text-navy-deep">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-gold">
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
      {error && (
        <p id={`error-${id}`} role="alert" className="mt-2 text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
