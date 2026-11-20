import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import MuiLink from "@mui/material/Link";
import { getLang } from "@/i18n/server";
import { t } from "@/i18n/dictionary";
import LanguageToggle from "@/i18n/LanguageToggle";

export default async function Home() {
  const lang = await getLang();
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 3,
          py: 6,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <LanguageToggle />
        </Box>
        <Typography variant="h3" component="h1">
          Park &amp; Revisit
        </Typography>
        <Typography variant="h6" component="p" color="text.secondary">
          {t(lang, "home.subtitle")}
        </Typography>
        <Box>
          <Stack direction="row" spacing={2}>
            <Button href="/login" variant="contained" size="large">
              {t(lang, "home.cta.login")}
            </Button>
          </Stack>
          <Typography variant="body2" sx={{ mt: 1.5 }}>
            <MuiLink href="/login?mode=signup">
              {t(lang, "home.signupLink")}
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
