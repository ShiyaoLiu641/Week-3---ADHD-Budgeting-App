"use client";

import { useActionState, useState } from "react";
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

const initialState: DeleteAllState = {};

export default function DangerZone({ hasItems }: { hasItems: boolean }) {
  const [wantOpen, setWantOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    deleteAllItems,
    initialState
  );

  // Show the dialog when the user asked for it, but close it automatically
  // once the delete has succeeded (state.ok). Derived, so no effect needed.
  const open = wantOpen && !state.ok;
  const setOpen = setWantOpen;

  return (
    <Box sx={{ mt: 6 }}>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle2" component="h2">
        Delete my data
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>
        Remove everything you&apos;ve parked. This can&apos;t be undone.
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
        Delete all my data
      </Button>
      {!hasItems ? (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 1 }}
        >
          Nothing to delete yet.
        </Typography>
      ) : null}

      <Dialog
        open={open}
        onClose={() => (pending ? null : setOpen(false))}
        aria-labelledby="delete-all-title"
        aria-describedby="delete-all-desc"
      >
        <DialogTitle id="delete-all-title">Delete all your data?</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-all-desc">
            This permanently removes every item you&apos;ve parked, along with
            its notes and decisions. This action can&apos;t be undone.
          </DialogContentText>
          {state.error ? (
            <Alert severity="error" sx={{ mt: 2 }}>
              {state.error}
            </Alert>
          ) : null}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)} disabled={pending}>
            Cancel
          </Button>
          {/* Submitting runs the server action; it re-checks auth and ownership. */}
          <form action={formAction}>
            <Button
              type="submit"
              variant="contained"
              color="error"
              disabled={pending}
            >
              {pending ? "Deleting…" : "Delete everything"}
            </Button>
          </form>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
