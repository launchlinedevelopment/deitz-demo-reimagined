import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";

type AdminSession = { unlocked?: boolean };

function sessionConfig() {
  return {
    password: process.env["SESSION_SECRET"]!,
    name: "sd-admin",
    maxAge: 60 * 60 * 8,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

function matches(input: string, expected: string) {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

async function requireAdmin() {
  const session = await useSession<AdminSession>(sessionConfig());
  if (!session.data.unlocked) throw new Error("Unauthorized");
  return session;
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
    const expected = process.env["ADMIN_PASSWORD"];
    if (!expected) throw new Error("Admin password is not configured.");
    if (!data.password || !matches(data.password, expected)) return { ok: false as const };
    const session = await useSession<AdminSession>(sessionConfig());
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionConfig());
  await session.clear();
  return { ok: true as const };
});

export const adminStatus = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionConfig());
  return { unlocked: session.data.unlocked === true };
});

export const listContactMessages = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("contact_messages")
    .select("id, name, email, phone, service, message, is_read, created_at")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) throw new Error("Could not load messages.");
  return (data ?? []) as ContactMessage[];
});

export const setMessageRead = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; isRead: boolean }) => ({
    id: String(data?.id ?? ""),
    isRead: Boolean(data?.isRead),
  }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("contact_messages")
      .update({ is_read: data.isRead })
      .eq("id", data.id);
    if (error) throw new Error("Could not update the message.");
    return { ok: true as const };
  });

export const deleteContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => ({ id: String(data?.id ?? "") }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_messages").delete().eq("id", data.id);
    if (error) throw new Error("Could not delete the message.");
    return { ok: true as const };
  });
