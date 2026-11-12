// Park & Revisit — business rules (the "domain layer").
//
// These are plain, pure functions: same input always gives the same output,
// and they touch no database and no screen. That makes them easy to TEST.
// Each one matches a Week 2 BDD rule for the app.

/** The only decisions a user can set on a parked item. */
export const DECISIONS = ["buy", "let_go", "still_deciding"] as const;
export type Decision = (typeof DECISIONS)[number];

/**
 * Rule: a parked item must have a name.
 * Given a name, When we check it, Then empty / spaces-only is NOT allowed.
 */
export function isValidItemName(name: string): boolean {
  // DELIBERATE BUG (Week 5 demo): always returns true, so an empty name
  // would wrongly be accepted. This should make the Vitest "test" check FAIL.
  return true;
}

/**
 * Rule: a decision must be one of buy | let_go | still_deciding.
 */
export function isValidDecision(decision: string): decision is Decision {
  return (DECISIONS as readonly string[]).includes(decision);
}

/**
 * Rule: the link is optional. If the user left it empty, that's fine.
 * If they typed something, it must be a real http(s) web address.
 */
export function isValidLink(link: string): boolean {
  const trimmed = link.trim();
  if (trimmed === "") return true; // optional — empty is allowed
  try {
    const url = new URL(trimmed);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false; // not a parseable URL
  }
}

/**
 * Turn "wait N days" into a real date (ISO string), or null if not chosen.
 * Only positive whole-ish numbers count; anything else means "no revisit date".
 */
export function revisitDateFromDays(
  rawDays: string,
  now: Date = new Date()
): string | null {
  const trimmed = rawDays.trim();
  if (trimmed === "") return null;
  const days = Number(trimmed);
  if (Number.isNaN(days) || days <= 0) return null;
  const d = new Date(now);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}
