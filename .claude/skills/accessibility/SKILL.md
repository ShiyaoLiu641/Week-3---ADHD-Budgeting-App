---
name: accessibility
description: Apply web accessibility standards (WCAG 2.2 AA) when building, changing, or reviewing any user-facing screen, component, form, image, color choice, or interactive element. Use when the task involves color contrast, keyboard use, screen readers, alt text, labels, focus, headings, or ARIA. Does NOT trigger for backend-only code, database queries, API logic, or files with no user interface.

---

# Accessibility

Based on WCAG 2.2 AA and its four principles: Perceivable, Operable, Understandable, Robust (POUR).

## Outcome

A screen that people can use with a keyboard only, with a screen reader, and with low vision or color blindness. Nothing relies on sight, hearing, a mouse, or color alone to be understood.

## Core rules

1. Text contrast meets WCAG AA: at least 4.5:1 for normal text and 3:1 for large text (18pt+/14pt bold) and for icons and input borders.
2. Never use color alone to carry meaning. Pair color with text, an icon, or a pattern (e.g. an error is red AND says "Error").
3. Every image has alt text: describe the meaning for informative images; use empty alt ("") for purely decorative ones.
4. Everything works with the keyboard only: all buttons, links, and inputs are reachable with Tab and usable with Enter or Space. No mouse-only actions.
5. The keyboard focus is always clearly visible (a focus ring). Focus order follows the visual reading order.
6. Every form field has a real, programmatically linked label (not placeholder-only). Errors are announced and describe how to fix them.
7. Use correct semantic HTML: real <button>, <a>, headings in order (one h1, then h2, h3), lists, and landmarks. Add ARIA only when HTML cannot do it.
8. Interactive targets are at least 24x24 CSS pixels (WCAG 2.2) with enough spacing.
9. Respect user settings: support text resize up to 200% without breaking layout, and honor reduced-motion preferences.
10. Media has text alternatives: captions for video, transcripts for audio.

## Checklist before finishing

- [ ] Text contrast is at least 4.5:1 (3:1 for large text and icons)
- [ ] Meaning never depends on color alone
- [ ] All images have appropriate alt text (empty for decorative)
- [ ] Full keyboard operation; focus is always visible and in logical order
- [ ] Every input has a linked, visible label; errors say how to fix
- [ ] Semantic HTML used; headings in order; ARIA only when needed
- [ ] Touch/click targets are at least 24x24px
- [ ] Layout survives 200% zoom; reduced motion respected

## Example

Bad: A red asterisk is the only sign a field is required, and the "X" close icon has no label.
Good: The field says "Email (required)", the error reads "Enter a valid email like name@site.com", and the close button is labeled "Close dialog".

## Edge cases

- Contrast unknown: treat it as failing until checked with a contrast tool; don't guess.
- A custom component (e.g. a fake dropdown): give it the right role, state, keyboard support, and focus management, or use a native element instead.
- Decorative vs informative image unclear: ask what the image communicates; if nothing, use empty alt.
- Backend-only task with no interface: this skill does not apply; skip it.