"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ItemCard, { type Item } from "./ItemCard";

// The four filters. "all" shows everything; the others match a decision.
// "Still deciding" is the default so the home view shows what still needs
// attention — and hides items the user has already let go of.
type Filter = "still_deciding" | "buy" | "let_go" | "all";

const TABS: { value: Filter; label: string }[] = [
  { value: "still_deciding", label: "Still deciding" },
  { value: "buy", label: "Buy" },
  { value: "let_go", label: "Let go" },
  { value: "all", label: "All" },
];

// Decide whether one item belongs in the current tab.
function matches(item: Item, filter: Filter): boolean {
  if (filter === "all") return true;
  // Brand-new items (no decision yet) live under "Still deciding".
  if (filter === "still_deciding") {
    return item.decision === "still_deciding" || item.decision === null;
  }
  return item.decision === filter;
}

export default function ItemsBoard({ items }: { items: Item[] }) {
  // Which tab is active. Starts on "Still deciding".
  const [filter, setFilter] = useState<Filter>("still_deciding");

  // The subset of items to show for the active tab.
  const visible = items.filter((item) => matches(item, filter));

  return (
    <Box>
      <Tabs
        value={filter}
        onChange={(_event, value) => setFilter(value)}
        aria-label="Filter items by decision"
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
      >
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>

      {visible.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: "center",
            border: "1px dashed",
            borderColor: "divider",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Nothing in this list yet.
          </Typography>
        </Paper>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2,
            alignItems: "start",
          }}
        >
          {visible.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </Box>
      )}
    </Box>
  );
}
