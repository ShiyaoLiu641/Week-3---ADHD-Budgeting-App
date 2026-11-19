import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import MuiLink from "@mui/material/Link";
import { setDecision, deleteItem } from "./actions";

export type Item = {
  id: string;
  name: string;
  link: string | null;
  note: string | null;
  revisit_at: string | null;
  decision: "buy" | "let_go" | "still_deciding" | null;
  created_at: string;
};

const decisionLabels: Record<string, string> = {
  buy: "Buy",
  let_go: "Let go",
  still_deciding: "Still deciding",
};

const decisionColors: Record<string, "primary" | "success" | "warning"> = {
  buy: "primary",
  let_go: "success",
  still_deciding: "warning",
};

function formatRevisit(iso: string | null): string | null {
  if (!iso) return null;
  const when = new Date(iso);
  const now = new Date();
  const dayMs = 24 * 60 * 60 * 1000;
  const days = Math.round((when.getTime() - now.getTime()) / dayMs);
  if (days > 1) return `Revisit in ${days} days`;
  if (days === 1) return "Revisit tomorrow";
  if (days === 0) return "Ready to revisit today";
  return "Ready to revisit";
}

const choices: Array<{ value: Item["decision"]; label: string }> = [
  { value: "buy", label: "Buy" },
  { value: "let_go", label: "Let go" },
  { value: "still_deciding", label: "Still deciding" },
];

export default function ItemCard({ item }: { item: Item }) {
  const revisitText = formatRevisit(item.revisit_at);
  // "Deciding" means null or still_deciding. Show only the states the user can
  // switch TO (never the current one): a still-deciding card shows just Buy and
  // Let go; a decided card shows the other option plus a way back to deciding.
  const isDecided = item.decision === "buy" || item.decision === "let_go";
  const current = item.decision ?? "still_deciding";
  const options = choices.filter((c) => c.value !== current);

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
              label={decisionLabels[item.decision]}
              color={decisionColors[item.decision]}
              size="small"
            />
          ) : null}
        </Stack>

        {item.link ? (
          <MuiLink href={item.link} target="_blank" rel="noopener noreferrer">
            View item ↗
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
          <Typography variant="caption" color="text.secondary">
            {isDecided ? "Change to" : "Decide"}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 0.5, flexWrap: "wrap", gap: 1 }}>
            {options.map((c) => (
              <form action={setDecision} key={c.value}>
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="decision" value={c.value ?? ""} />
                <Button
                  type="submit"
                  size="small"
                  variant="outlined"
                  color={
                    c.value === "still_deciding"
                      ? "inherit"
                      : decisionColors[c.value as "buy" | "let_go"]
                  }
                  sx={
                    c.value === "still_deciding"
                      ? { color: "text.secondary", borderColor: "divider" }
                      : undefined
                  }
                >
                  {c.label}
                </Button>
              </form>
            ))}
          </Stack>
        </Box>

        <Box>
          <form action={deleteItem}>
            <input type="hidden" name="id" value={item.id} />
            <Button type="submit" size="small" color="inherit" sx={{ color: "text.secondary" }}>
              Remove
            </Button>
          </form>
        </Box>
      </Stack>
    </Paper>
  );
}
