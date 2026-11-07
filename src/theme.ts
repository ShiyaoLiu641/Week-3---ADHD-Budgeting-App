"use client";

import { createTheme } from "@mui/material/styles";

// A calm, shame-free theme for the Park & Revisit app.
// Soft colors, generous spacing, large tap targets (ADHD-friendly + WCAG 2.2 AA).
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4f6af0", // calm blue
    },
    secondary: {
      main: "#5bb98c", // soft green for "let go" / positive
    },
    background: {
      default: "#f7f8fc",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1a2e",
      secondary: "#5a5a6e",
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily:
      'var(--font-geist-sans), system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    // Large, easy tap targets everywhere.
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { minHeight: 48, paddingInline: 20, fontSize: "1rem" },
      },
    },
  },
});

export default theme;
