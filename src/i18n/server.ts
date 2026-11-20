import { cookies } from "next/headers";
import type { Lang } from "./dictionary";

// Read the chosen language from the "lang" cookie. Defaults to English.
// Server Components (pages, layout) call this to pick the right text.
export async function getLang(): Promise<Lang> {
  const store = await cookies();
  return store.get("lang")?.value === "zh" ? "zh" : "en";
}
