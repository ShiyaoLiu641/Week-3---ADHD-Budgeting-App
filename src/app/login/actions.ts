"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Sign in an existing user with email + password.
export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect(`/login?error=${encodeURIComponent("Please enter your email and password.")}`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?mode=login&error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/items");
}

// Create a new account with email + password.
export async function signup(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect(`/login?mode=signup&error=${encodeURIComponent("Please enter your email and password.")}`);
  }
  if (password.length < 6) {
    redirect(`/login?mode=signup&error=${encodeURIComponent("Password must be at least 6 characters.")}`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect(`/login?mode=signup&error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/items");
}
