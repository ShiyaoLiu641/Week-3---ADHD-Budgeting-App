import { describe, it, expect } from "vitest";
import {
  isValidItemName,
  isValidDecision,
  isValidLink,
  revisitDateFromDays,
} from "./validation";

// These tests come straight from the Week 2 BDD scenarios.
// Each `it(...)` is one Given / When / Then rule.

describe("Park an item: the name is required", () => {
  it("accepts a real name", () => {
    // Given a user, When they type a name, Then it is allowed.
    expect(isValidItemName("Nintendo Switch")).toBe(true);
  });

  it("rejects an empty name", () => {
    // Given a user, When the name is blank, Then it is NOT allowed.
    expect(isValidItemName("")).toBe(false);
  });

  it("rejects a name that is only spaces", () => {
    expect(isValidItemName("   ")).toBe(false);
  });
});

describe("Set a decision: only buy / let_go / still_deciding", () => {
  it("accepts the three valid decisions", () => {
    expect(isValidDecision("buy")).toBe(true);
    expect(isValidDecision("let_go")).toBe(true);
    expect(isValidDecision("still_deciding")).toBe(true);
  });

  it("rejects anything else", () => {
    // Given a decision, When it is not one of the three, Then reject it.
    expect(isValidDecision("maybe")).toBe(false);
    expect(isValidDecision("")).toBe(false);
    expect(isValidDecision("BUY")).toBe(false);
  });
});

describe("The link is optional, but must be a real web address if given", () => {
  it("allows an empty link", () => {
    // Given no link, When we check it, Then it's fine (link is optional).
    expect(isValidLink("")).toBe(true);
    expect(isValidLink("   ")).toBe(true);
  });

  it("allows a normal http(s) address", () => {
    expect(isValidLink("https://www.amazon.com/item")).toBe(true);
    expect(isValidLink("http://example.com")).toBe(true);
  });

  it("rejects something that is not a web address", () => {
    expect(isValidLink("just some text")).toBe(false);
    expect(isValidLink("amazon.com")).toBe(false); // no http:// prefix
  });
});

describe("Revisit date: 'wait N days' becomes a real date", () => {
  it("returns null when nothing is chosen", () => {
    expect(revisitDateFromDays("")).toBe(null);
    expect(revisitDateFromDays("0")).toBe(null);
    expect(revisitDateFromDays("-3")).toBe(null);
    expect(revisitDateFromDays("abc")).toBe(null);
  });

  it("returns a date N days from now", () => {
    // Given today is a fixed date, When we wait 7 days, Then we get that date + 7.
    const today = new Date("2026-01-01T00:00:00.000Z");
    const result = revisitDateFromDays("7", today);
    expect(result).toBe("2026-01-08T00:00:00.000Z");
  });
});
