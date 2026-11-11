---
name: security
description: Apply web application security practices (OWASP Top 10) when writing, changing, or reviewing code that handles user input, authentication, passwords, sessions, file uploads, database queries, API requests, secrets, or access control. Use when the task involves login, forms that reach a server, user data, permissions, or anything that could be attacked. Does NOT trigger for pure styling, static copy, or UI layout with no data handling.

---

# Security

Based on the OWASP Top 10 (the most common web vulnerabilities).

## Outcome

Code that does not trust user input, protects secrets and passwords, checks who is allowed to do each action, and fails safely without leaking information.

## Core rules

1. Never trust user input. Validate and sanitize everything from the user, the URL, or another service before using it.
2. Prevent injection: use parameterized queries / prepared statements for databases, never build SQL or commands by gluing strings together. Escape output shown in HTML.
3. Control access on the server for every action. Check the user is logged in AND allowed, on each request. Never rely on hiding a button in the UI.
4. Protect passwords: store them only as salted hashes (e.g. bcrypt/argon2), never in plain text. Support strong passwords and rate-limit login attempts.
5. Keep secrets out of the code: API keys, tokens, and passwords live in environment variables or a secrets manager, never hard-coded or committed to Git.
6. Use HTTPS everywhere. Set secure, httpOnly cookies for sessions and protect forms against CSRF.
7. Give the least privilege needed: each user, token, and service gets only the minimum permissions.
8. Don't leak information in errors: show the user a generic message, log the details privately. Never expose stack traces, SQL, or internal paths.
9. Keep dependencies updated and check them for known vulnerabilities.
10. Validate file uploads: check type and size, store them outside the web root, and never trust the file name.

## Checklist before finishing

- [ ] All user input is validated and sanitized
- [ ] Database access uses parameterized queries (no string-built SQL)
- [ ] Every sensitive action checks authentication AND authorization on the server
- [ ] Passwords are hashed and salted; login is rate-limited
- [ ] No secrets or API keys in the code or Git history
- [ ] HTTPS, secure cookies, and CSRF protection are in place
- [ ] Errors show a generic message to users; details are logged privately
- [ ] Dependencies are current and scanned for vulnerabilities

## Example

Bad: A search box builds a query like "SELECT * FROM users WHERE name = '" + input + "'", and an error dumps the full SQL to the screen.
Good: The query uses a parameter (WHERE name = ?), and on failure the user sees "Something went wrong, please try again" while the real error is logged on the server.

## Edge cases

- Unsure if input is trusted: treat it as untrusted and validate it.
- No existing auth system: flag it and ask before building sensitive features; do not ship access control that only hides UI.
- A secret is already in the code or Git: stop, tell the user, and recommend rotating (replacing) that secret.
- Pure styling or static text with no data handling: this skill does not apply; skip it.