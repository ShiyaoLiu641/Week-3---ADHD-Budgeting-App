"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { createItem, type ItemFormState } from "./actions";
import { useT } from "@/i18n/LanguageProvider";
import { type TranslationKey } from "@/i18n/dictionary";

const initialState: ItemFormState = {};

const waitOptions: { value: string; labelKey: TranslationKey }[] = [
  { value: "", labelKey: "form.revisit.none" },
  { value: "1", labelKey: "form.revisit.1day" },
  { value: "3", labelKey: "form.revisit.3days" },
  { value: "7", labelKey: "form.revisit.1week" },
  { value: "date", labelKey: "form.revisit.date" },
];

export default function AddItemForm() {
  const t = useT();
  const [state, formAction, pending] = useActionState(createItem, initialState);
  // Whether the form is expanded. Starts collapsed to keep the list clean.
  const [open, setOpen] = useState(false);
  // Controlled value of the "Revisit after" dropdown, so we can reset it
  // and show a date picker only when "Choose a specific date" is picked.
  const [revisit, setRevisit] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // After a successful save: clear fields, reset the dropdown, and collapse.
  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
      setRevisit("");
      setOpen(false);
    }
  }, [state]);

  // Today's date (YYYY-MM-DD), used to block picking a day in the past.
  const today = new Date().toISOString().slice(0, 10);

  return (
    <Paper
      elevation={0}
      sx={{ p: 3, mb: 4, border: "1px solid", borderColor: "divider" }}
    >
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="h6" component="h2">
          {t("form.heading")}
        </Typography>
        <Button
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="park-item-form"
          endIcon={<span aria-hidden="true">{open ? "▲" : "▼"}</span>}
        >
          {open ? t("form.toggle.close") : t("form.toggle.add")}
        </Button>
      </Stack>

      <Collapse in={open} id="park-item-form">
        {state.error ? (
          <Alert severity="error" sx={{ mt: 2 }}>
            {state.error}
          </Alert>
        ) : null}

        <Box component="form" ref={formRef} action={formAction} sx={{ mt: 2 }}>
          <Stack spacing={2}>
            <TextField
              label={t("form.name.label")}
              name="name"
              required
              fullWidth
              autoComplete="off"
              placeholder={t("form.name.placeholder")}
            />
            <TextField
              label={t("form.link.label")}
              name="link"
              fullWidth
              autoComplete="off"
              placeholder={t("form.link.placeholder")}
            />
            <TextField
              label={t("form.note.label")}
              name="note"
              fullWidth
              multiline
              minRows={2}
              autoComplete="off"
              placeholder={t("form.note.placeholder")}
            />
            <TextField
              label={t("form.revisit.label")}
              name="revisitDays"
              select
              fullWidth
              value={revisit}
              onChange={(e) => setRevisit(e.target.value)}
            >
              {waitOptions.map((o) => (
                <MenuItem key={o.value} value={o.value}>
                  {t(o.labelKey)}
                </MenuItem>
              ))}
            </TextField>

            {revisit === "date" ? (
              <TextField
                label={t("form.date.label")}
                name="revisitDate"
                type="date"
                fullWidth
                slotProps={{
                  inputLabel: { shrink: true },
                  htmlInput: { min: today },
                }}
              />
            ) : null}

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={pending}
            >
              {pending ? t("form.submit.saving") : t("form.submit")}
            </Button>
          </Stack>
        </Box>
      </Collapse>
    </Paper>
  );
}
