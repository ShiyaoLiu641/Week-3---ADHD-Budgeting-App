"use client";

import { useActionState, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { deleteAllItems, type DeleteAllState } from "./actions";
import { useT } from "@/i18n/LanguageProvider";

const initialState: DeleteAllState = {};

export default function DangerZone({ hasItems }: { hasItems: boolean }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    deleteAllItems,
    initialState
  );

  // Close the dialog once the data is actually deleted.
  useEffect(() => {
    if (state.ok) setOpen(false);
  }, [state]);

  return (
    <Box sx={{ mt: 6 }}>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle2" component="h2">
        {t("danger.heading")}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>
        {t("danger.desc")}
      </Typography>

      {state.error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {state.error}
        </Alert>
      ) : null}

      <Button
        variant="outlined"
        color="error"
        onClick={() => setOpen(true)}
        disabled={!hasItems}
      >
        {t("danger.button")}
      </Button>
      {!hasItems ? (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 1 }}
        >
          {t("danger.nothing")}
        </Typography>
      ) : null}

      <Dialog
        open={open}
        onClose={() => (pending ? null : setOpen(false))}
        aria-labelledby="delete-all-title"
        aria-describedby="delete-all-desc"
      >
        <DialogTitle id="delete-all-title">{t("danger.dialog.title")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-all-desc">
            {t("danger.dialog.body")}
          </DialogContentText>
          {state.error ? (
            <Alert severity="error" sx={{ mt: 2 }}>
              {state.error}
            </Alert>
          ) : null}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)} disabled={pending}>
            {t("danger.dialog.cancel")}
          </Button>
          {/* Submitting runs the server action; it re-checks auth and ownership. */}
          <form action={formAction}>
            <Button
              type="submit"
              variant="contained"
              color="error"
              disabled={pending}
            >
              {pending ? t("danger.dialog.deleting") : t("danger.dialog.confirm")}
            </Button>
          </form>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
