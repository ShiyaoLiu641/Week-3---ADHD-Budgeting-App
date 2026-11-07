"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ItemFormState = { error?: string; ok?: number };

// US-1.1 — Save (park) an item. Name is required; link/note/revisit optional.
export async function createItem(
  _prev: ItemFormState,
  formData: FormData
): Promise<ItemFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const link = String(formData.get("link") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();
  const revisitDays = String(formData.get("revisitDays") ?? "").trim();

  // Keep the user's typed input and show a plain message if name is empty.
  if (!name) {
    return { error: "Please type what you want to park." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Your session ended. Please log in again." };
  }

  // Turn "wait N days" into an actual date, if chosen.
  let revisit_at: string | null = null;
  const days = Number(revisitDays);
  if (revisitDays && !Number.isNaN(days) && days > 0) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    revisit_at = d.toISOString();
  }

  const { error } = await supabase.from("items").insert({
    user_id: user.id,
    name,
    link: link || null,
    note: note || null,
    revisit_at,
  });

  if (error) {
    return { error: "Could not save. Please try again." };
  }

  revalidatePath("/items");
  return { ok: Date.now() };
}

// US-3.1 — Record / change a decision: buy | let_go | still_deciding.
export async function setDecision(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const decision = String(formData.get("decision") ?? "");
  const allowed = ["buy", "let_go", "still_deciding"];
  if (!id || !allowed.includes(decision)) return;

  const supabase = await createClient();
  // Row Level Security makes sure a user can only change their own rows.
  await supabase.from("items").update({ decision }).eq("id", id);
  revalidatePath("/items");
}

// Remove an item the user no longer wants on the list.
export async function deleteItem(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  await supabase.from("items").delete().eq("id", id);
  revalidatePath("/items");
}
