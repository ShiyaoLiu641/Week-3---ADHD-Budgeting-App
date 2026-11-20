import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AddItemForm from "./AddItemForm";
import { type Item } from "./ItemCard";
import ItemsBoard from "./ItemsBoard";
import DangerZone from "./DangerZone";
import { getLang } from "@/i18n/server";
import { t } from "@/i18n/dictionary";
import LanguageToggle from "@/i18n/LanguageToggle";

export default async function ItemsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Row Level Security returns only this user's items.
  const { data: items } = await supabase
    .from("items")
    .select("*")
    .order("created_at", { ascending: false });

  const list = (items ?? []) as Item[];
  const lang = await getLang();

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 6 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center", mb: 1 }}
        >
          <Typography variant="h4" component="h1">
            Park &amp; Revisit
          </Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <LanguageToggle />
            <form action="/auth/signout" method="post">
              <Button type="submit" variant="text" size="small">
                {t(lang, "items.logout")}
              </Button>
            </form>
          </Stack>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          {t(lang, "items.signedInAs", { email: user.email ?? "" })}
        </Typography>

        <AddItemForm />

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
          {t(lang, "items.title")}
        </Typography>

        {list.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: "center",
              border: "1px dashed",
              borderColor: "divider",
            }}
          >
            <Typography variant="h6" component="p" gutterBottom>
              {t(lang, "items.empty.title")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(lang, "items.empty.body")}
            </Typography>
          </Paper>
        ) : (
          <ItemsBoard items={list} />
        )}

        <DangerZone hasItems={list.length > 0} />
      </Box>
    </Container>
  );
}
