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

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; mode?: string }>;
}) {
  const params = await searchParams;
  const isSignup = params.mode === "signup";

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
          <Typography variant="h5" component="h1" gutterBottom>
            {isSignup ? "Create your account" : "Welcome back"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Park & Revisit keeps your parked items private to you.
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
                label="Email"
                name="email"
                type="email"
                required
                autoComplete="email"
                fullWidth
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                required
                autoComplete={isSignup ? "new-password" : "current-password"}
                helperText={isSignup ? "At least 6 characters." : undefined}
                fullWidth
              />
              <Button type="submit" variant="contained" size="large">
                {isSignup ? "Sign up" : "Log in"}
              </Button>
            </Stack>
          </form>

          <Typography variant="body2" sx={{ mt: 3 }}>
            {isSignup ? (
              <>
                Already have an account?{" "}
                <MuiLink href="/login?mode=login">Log in</MuiLink>
              </>
            ) : (
              <>
                New here?{" "}
                <MuiLink href="/login?mode=signup">Create an account</MuiLink>
              </>
            )}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
