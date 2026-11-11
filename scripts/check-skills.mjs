// Gate-check for the Week 1 Claude Skills that live in .claude/skills/.
//
// Every skill must have a SKILL.md with valid frontmatter: a `name` that
// matches its folder, and a non-empty `description`. If any skill is missing
// or broken, this script prints why and exits with code 1 — which makes the
// CI check (and the push) fail. No extra libraries needed.

import { readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const SKILLS_DIR = ".claude/skills";

// The Week 1 skills we expect to always be present.
const REQUIRED_SKILLS = [
  "accessibility",
  "error-handling",
  "security",
  "testing",
  "ux-design",
];

const problems = [];

// Pull `name` and `description` out of the --- frontmatter --- block.
function readFrontmatter(text) {
  const match = text.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return null;
  const body = match[1];
  const fields = {};
  for (const line of body.split("\n")) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kv) fields[kv[1]] = kv[2].trim();
  }
  return fields;
}

if (!existsSync(SKILLS_DIR)) {
  console.error(`✖ Missing folder: ${SKILLS_DIR}`);
  process.exit(1);
}

for (const skill of REQUIRED_SKILLS) {
  const file = join(SKILLS_DIR, skill, "SKILL.md");

  if (!existsSync(file)) {
    problems.push(`${skill}: SKILL.md is missing`);
    continue;
  }
  if (statSync(file).size === 0) {
    problems.push(`${skill}: SKILL.md is empty`);
    continue;
  }

  const text = readFileSync(file, "utf8");
  const fm = readFrontmatter(text);

  if (!fm) {
    problems.push(`${skill}: no --- frontmatter --- block found`);
    continue;
  }
  if (!fm.name) {
    problems.push(`${skill}: frontmatter is missing "name"`);
  } else if (fm.name !== skill) {
    problems.push(`${skill}: name "${fm.name}" does not match folder "${skill}"`);
  }
  if (!fm.description || fm.description.length < 10) {
    problems.push(`${skill}: frontmatter "description" is missing or too short`);
  }
}

if (problems.length > 0) {
  console.error("✖ Skill gate-check FAILED:");
  for (const p of problems) console.error("  - " + p);
  process.exit(1);
}

console.log(`✓ All ${REQUIRED_SKILLS.length} Week 1 skills are valid.`);
