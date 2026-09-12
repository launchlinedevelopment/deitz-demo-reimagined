import { createServerFn } from "@tanstack/react-start";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/**
 * Demo defaults so the project also runs from a plain GitHub clone with no
 * environment variables configured. Hosted environments override these.
 */
const DEFAULT_ADMIN_PASSWORD = "Launchline2026!";
const DEFAULT_SESSION_SECRET = "launchline-demo-session-secret-key-32chars";

const TOKEN_TTL_MS = 1000 * 60 * 60 * 8;

function secret() {
  return process.env["SESSION_SECRET"] || DEFAULT_SESSION_SECRET;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

function issueToken() {
  const payload = String(Date.now() + TOKEN_TTL_MS);
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token: string) {
  const [payload, signature] = String(token ?? "").split(".");
  if (!payload || !signature) return false;
  const expected = sign(payload);
  if (signature.length !== expected.length) return false;
  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
  return Number(payload) > Date.now();
}

function matches(input: string, expected: string) {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

function requireAdmin(token: string) {
  if (!verifyToken(token)) throw new Error("Unauthorized");
}

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

type SubmitInput = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: SubmitInput) => {
    const name = String(data?.name ?? "").trim().slice(0, 100);
    const email = String(data?.email ?? "").trim().slice(0, 255);
    const phone = String(data?.phone ?? "").trim().slice(0, 30);
    const service = String(data?.service ?? "").trim().slice(0, 60);
    const message = String(data?.message ?? "").trim().slice(0, 2000);
    if (!name || !service || !message) throw new Error("Missing required fields");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) throw new Error("Invalid email");
    return { name, email, phone, service, message };
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      service: data.service,
      message: data.message,
    });
    if (error) throw new Error("Could not save your message. Please try again.");
    return { ok: true as const };
  });

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => ({ password: String(data?.password ?? "") }))
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_PASSWORD"] || DEFAULT_ADMIN_PASSWORD;
    if (!data.password || !matches(data.password, expected)) return { ok: false as const, token: "" };
    return { ok: true as const, token: issueToken() };
  });

export const adminStatus = createServerFn({ method: "POST" })
  .inputValidator((data: { token: string }) => ({ token: String(data?.token ?? "") }))
  .handler(async ({ data }) => ({ unlocked: verifyToken(data.token) }));

export const listContactMessages = createServerFn({ method: "POST" })
  .inputValidator((data: { token: string }) => ({ token: String(data?.token ?? "") }))
  .handler(async ({ data }) => {
    requireAdmin(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("contact_messages")
      .select("id, name, email, phone, service, message, is_read, created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error("Could not load messages.");
    return (rows ?? []) as ContactMessage[];
  });

export const setMessageRead = createServerFn({ method: "POST" })
  .inputValidator((data: { token: string; id: string; isRead: boolean }) => ({
    token: String(data?.token ?? ""),
    id: String(data?.id ?? ""),
    isRead: Boolean(data?.isRead),
  }))
  .handler(async ({ data }) => {
    requireAdmin(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("contact_messages")
      .update({ is_read: data.isRead })
      .eq("id", data.id);
    if (error) throw new Error("Could not update the message.");
    return { ok: true as const };
  });

export const deleteContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: { token: string; id: string }) => ({
    token: String(data?.token ?? ""),
    id: String(data?.id ?? ""),
  }))
  .handler(async ({ data }) => {
    requireAdmin(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_messages").delete().eq("id", data.id);
    if (error) throw new Error("Could not delete the message.");
    return { ok: true as const };
  });
