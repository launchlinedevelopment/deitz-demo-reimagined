import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Inbox, Lock, LogOut, Mail, Phone, RefreshCw, Trash2 } from "lucide-react";
import {
  adminLogin,
  adminStatus,
  deleteContactMessage,
  listContactMessages,
  setMessageRead,
  type ContactMessage,
} from "@/lib/contact.functions";

const TOKEN_KEY = "sd-admin-token";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Message Inbox | Simon & Deitz LLC Admin" },
      { name: "description", content: "Private inbox for inquiries submitted through the website contact form." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Message Inbox — Simon & Deitz LLC" },
      { property: "og:description", content: "Private admin inbox for website inquiries." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [token, setToken] = useState("");
  const [ready, setReady] = useState(false);
  const status = useServerFn(adminStatus);

  useEffect(() => {
    const stored = sessionStorage.getItem(TOKEN_KEY) ?? "";
    if (!stored) {
      setReady(true);
      return;
    }
    status({ data: { token: stored } })
      .then((r) => {
        if (r.unlocked) setToken(stored);
        else sessionStorage.removeItem(TOKEN_KEY);
      })
      .catch(() => sessionStorage.removeItem(TOKEN_KEY))
      .finally(() => setReady(true));
  }, [status]);

  function signOut() {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken("");
  }

  return (
    <>
      <PageHero
        eyebrow="Administration"
        title="Message Inbox"
        intro="Inquiries submitted through the website contact form are collected here. This area is protected by a separate administrator password."
      />
      {!ready ? (
        <div className="container-page section-y text-muted-foreground">Loading…</div>
      ) : token ? (
        <Inboxes token={token} onLockedOut={signOut} />
      ) : (
        <AdminLogin
          onUnlocked={(t) => {
            sessionStorage.setItem(TOKEN_KEY, t);
            setToken(t);
          }}
        />
      )}
    </>
  );
}

function AdminLogin({ onUnlocked }: { onUnlocked: (token: string) => void }) {
  const login = useServerFn(adminLogin);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    try {
      const result = await login({ data: { password: value } });
      if (result.ok) onUnlocked(result.token);
      else {
        setError("Incorrect administrator password.");
        setValue("");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container-page section-y">
      <div className="card-surface mx-auto max-w-lg p-7 sm:p-10">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-surface text-navy-deep">
          <Lock aria-hidden="true" className="h-5 w-5" />
        </span>
        <h2 className="mt-5 text-2xl">Administrator Sign In</h2>
        <p className="mt-3 text-[0.98rem] text-muted-foreground">
          Enter the administrator password to view messages submitted through the contact form.
        </p>
        <form onSubmit={onSubmit} noValidate className="mt-7 space-y-3">
          <label htmlFor="admin-password" className="block text-sm font-semibold text-navy-deep">
            Administrator password
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            className="field-input"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError("");
            }}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "admin-password-error" : undefined}
          />
          {error && (
            <p id="admin-password-error" role="alert" className="text-sm font-medium text-destructive">
              {error}
            </p>
          )}
          <button type="submit" className="btn-primary w-full" disabled={busy}>
            {busy ? "Checking…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Inboxes({ onLockedOut }: { onLockedOut: () => void }) {
  const list = useServerFn(listContactMessages);
  const markRead = useServerFn(setMessageRead);
  const remove = useServerFn(deleteContactMessage);
  const logout = useServerFn(adminLogout);

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setMessages(await list());
      setError("");
    } catch {
      setError("Could not load messages. Your session may have expired.");
      onLockedOut();
    } finally {
      setLoading(false);
    }
  }, [list, onLockedOut]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <div className="container-page section-y">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="flex items-center gap-2 text-navy-deep">
          <Inbox aria-hidden="true" className="h-5 w-5 text-gold" />
          <span className="font-semibold">
            {messages.length} message{messages.length === 1 ? "" : "s"}
          </span>
          <span className="text-muted-foreground">· {unread} unread</span>
        </p>
        <div className="flex gap-3">
          <button type="button" className="btn-outline" onClick={() => void refresh()}>
            <RefreshCw aria-hidden="true" className="mr-2 inline h-4 w-4" />
            Refresh
          </button>
          <button
            type="button"
            className="btn-outline"
            onClick={async () => {
              await logout();
              onLockedOut();
            }}
          >
            <LogOut aria-hidden="true" className="mr-2 inline h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-6 text-sm font-medium text-destructive">
          {error}
        </p>
      )}

      {loading ? (
        <p className="mt-8 text-muted-foreground">Loading messages…</p>
      ) : messages.length === 0 ? (
        <div className="card-surface mt-8 p-10 text-center">
          <h2 className="text-xl">No messages yet</h2>
          <p className="mt-3 text-muted-foreground">
            Inquiries sent from the contact page will appear here.
          </p>
        </div>
      ) : (
        <ul className="mt-8 space-y-5">
          {messages.map((m) => (
            <li key={m.id} className="card-surface p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg">
                    {m.name}
                    {!m.is_read && (
                      <span className="ml-3 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-navy-deep">
                        New
                      </span>
                    )}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {m.service} · {new Date(m.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={async () => {
                      await markRead({ data: { id: m.id, isRead: !m.is_read } });
                      void refresh();
                    }}
                  >
                    {m.is_read ? "Mark unread" : "Mark read"}
                  </button>
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={async () => {
                      await remove({ data: { id: m.id } });
                      void refresh();
                    }}
                    aria-label={`Delete message from ${m.name}`}
                  >
                    <Trash2 aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-5 text-sm">
                <a href={`mailto:${m.email}`} className="link-quiet inline-flex items-center gap-2">
                  <Mail aria-hidden="true" className="h-4 w-4 text-gold" />
                  {m.email}
                </a>
                {m.phone && (
                  <a href={`tel:${m.phone}`} className="link-quiet inline-flex items-center gap-2">
                    <Phone aria-hidden="true" className="h-4 w-4 text-gold" />
                    {m.phone}
                  </a>
                )}
              </div>

              <p className="mt-4 whitespace-pre-wrap text-[0.98rem] text-muted-foreground">{m.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
