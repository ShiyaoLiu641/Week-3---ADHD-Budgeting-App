import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import MuiLink from "@mui/material/Link";
import { login, signup } from "./actions";
import { getLang } from "@/i18n/server";
import { t } from "@/i18n/dictionary";
import LanguageToggle from "@/i18n/LanguageToggle";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; mode?: string }>;
}) {
  const params = await searchParams;
  const isSignup = params.mode === "signup";
  const lang = await getLang();

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          py: 6,
        }}
      >
        <Paper elevation={0} sx={{ p: 4, border: "1px solid", borderColor: "divider" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
            <LanguageToggle />
          </Box>
          <Typography variant="h5" component="h1" gutterBottom>
            {isSignup
              ? t(lang, "login.title.signup")
              : t(lang, "login.title.login")}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {t(lang, "login.subtitle")}
          </Typography>

          {params.error ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {params.error}
            </Alert>
          ) : null}

          {/* The form's action is the server function for the current mode. */}
          <form action={isSignup ? signup : login}>
            <Stack spacing={2}>
              <TextField
                label={t(lang, "login.email")}
                name="email"
                type="email"
                required
                autoComplete="email"
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label={t(lang, "login.password")}
                name="password"
                type="password"
                required
                autoComplete={isSignup ? "new-password" : "current-password"}
                helperText={isSignup ? t(lang, "login.passwordHint") : undefined}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <Button type="submit" variant="contained" size="large">
                {isSignup
                  ? t(lang, "login.submit.signup")
                  : t(lang, "login.submit.login")}
              </Button>
            </Stack>
          </form>

          <Typography variant="body2" sx={{ mt: 3 }}>
            {isSignup ? (
              <>
                {t(lang, "login.haveAccount")}{" "}
                <MuiLink href="/login?mode=login">
                  {t(lang, "login.toLogin")}
                </MuiLink>
              </>
            ) : (
              <>
                {t(lang, "login.newHere")}{" "}
                <MuiLink href="/login?mode=signup">
                  {t(lang, "login.toSignup")}
                </MuiLink>
              </>
            )}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
