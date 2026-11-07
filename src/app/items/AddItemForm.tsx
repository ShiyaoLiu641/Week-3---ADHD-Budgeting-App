"use client";

import { useActionState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { createItem, type ItemFormState } from "./actions";

const initialState: ItemFormState = {};

const waitOptions = [
  { value: "", label: "No set time" },
  { value: "1", label: "1 day" },
  { value: "3", label: "3 days" },
  { value: "7", label: "1 week" },
  { value: "14", label: "2 weeks" },
  { value: "30", label: "1 month" },
];

export default function AddItemForm() {
  const [state, formAction, pending] = useActionState(createItem, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Clear the form after a successful save.
  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);

  return (
    <Paper
      elevation={0}
      sx={{ p: 3, mb: 4, border: "1px solid", borderColor: "divider" }}
    >
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        Park an item
      </Typography>

      {state.error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {state.error}
        </Alert>
      ) : null}

      <Box component="form" ref={formRef} action={formAction}>
        <Stack spacing={2}>
          <TextField
            label="What are you tempted to buy?"
            name="name"
            required
            fullWidth
            autoComplete="off"
            placeholder="e.g. a second pair of running shoes"
          />
          <TextField
            label="Link (optional)"
            name="link"
            fullWidth
            autoComplete="off"
            placeholder="Paste the product link"
          />
          <TextField
            label="Note (optional)"
            name="note"
            fullWidth
            multiline
            minRows={2}
            autoComplete="off"
            placeholder="Why do you want it? What would it replace?"
          />
          <TextField
            label="Revisit after (optional)"
            name="revisitDays"
            select
            fullWidth
            defaultValue=""
          >
            {waitOptions.map((o) => (
              <MenuItem key={o.value} value={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={pending}
          >
            {pending ? "Saving…" : "Park it"}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
