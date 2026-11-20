"use client";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import MuiLink from "@mui/material/Link";
import { setDecision, deleteItem } from "./actions";
import { useT } from "@/i18n/LanguageProvider";
import { type TranslationKey } from "@/i18n/dictionary";

export type Item = {
  id: string;
  name: string;
  link: string | null;
  note: string | null;
  revisit_at: string | null;
  decision: "buy" | "let_go" | "still_deciding" | null;
  created_at: string;
};

const decisionColors: Record<string, "primary" | "success" | "warning"> = {
  buy: "primary",
  let_go: "success",
  still_deciding: "warning",
};

// Work out which "revisit" message to show, as a dictionary key (plus a number
// to fill in for the "in N days" case). The component translates it.
function revisitInfo(
  iso: string | null
): { key: TranslationKey; vars?: Record<string, number> } | null {
  if (!iso) return null;
  const when = new Date(iso);
  const now = new Date();
  const dayMs = 24 * 60 * 60 * 1000;
  const days = Math.round((when.getTime() - now.getTime()) / dayMs);
  if (days > 1) return { key: "card.revisit.inDays", vars: { n: days } };
  if (days === 1) return { key: "card.revisit.tomorrow" };
  if (days === 0) return { key: "card.revisit.today" };
  return { key: "card.revisit.ready" };
}

const choices: Array<"buy" | "let_go" | "still_deciding"> = [
  "buy",
  "let_go",
  "still_deciding",
];

export default function ItemCard({ item }: { item: Item }) {
  const t = useT();
  const revisit = revisitInfo(item.revisit_at);
  const revisitText = revisit ? t(revisit.key, revisit.vars) : null;
  // "Deciding" means null or still_deciding. Show only the states the user can
  // switch TO (never the current one): a still-deciding card shows just Buy and
  // Let go; a decided card shows the other option plus a way back to deciding.
  const current = item.decision ?? "still_deciding";
  const options = choices.filter((value) => value !== current);

  return (
    <Paper
      elevation={0}
      sx={{ p: 2, border: "1px solid", borderColor: "divider" }}
    >
      <Stack spacing={1}>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}
        >
          <Typography variant="h6" component="h3">
            {item.name}
          </Typography>
          {/* Only "Buy" and "Let go" get a chip. "Still deciding" (whether
              set on purpose or never decided) stays neutral, so the Still
              deciding list looks consistent and calm. */}
          {item.decision === "buy" || item.decision === "let_go" ? (
            <Chip
              label={t(`card.decision.${item.decision}` as TranslationKey)}
              color={decisionColors[item.decision]}
              size="small"
            />
          ) : null}
        </Stack>

        {item.link ? (
          <MuiLink href={item.link} target="_blank" rel="noopener noreferrer">
            {t("card.viewItem")}
          </MuiLink>
        ) : null}

        {item.note ? (
          <Typography variant="body2" color="text.secondary">
            {item.note}
          </Typography>
        ) : null}

        {revisitText ? (
          <Typography variant="body2" color="text.secondary">
            ⏳ {revisitText}
          </Typography>
        ) : null}

        {/* US-3.1 — choose/change a decision. The clicked button submits its value. */}
        <Box>
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
            {options.map((value) => (
              <form action={setDecision} key={value}>
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="decision" value={value} />
                <Button
                  type="submit"
                  size="small"
                  variant="outlined"
                  color={
                    value === "still_deciding"
                      ? "inherit"
                      : decisionColors[value as "buy" | "let_go"]
                  }
                  sx={
                    value === "still_deciding"
                      ? { color: "text.secondary", borderColor: "divider" }
                      : undefined
                  }
                >
                  {t(`card.decision.${value}` as TranslationKey)}
                </Button>
              </form>
            ))}
          </Stack>
        </Box>

        <Box>
          <form action={deleteItem}>
            <input type="hidden" name="id" value={item.id} />
            <Button type="submit" size="small" color="inherit" sx={{ color: "text.secondary" }}>
              {t("card.remove")}
            </Button>
          </form>
        </Box>
      </Stack>
    </Paper>
  );
}
