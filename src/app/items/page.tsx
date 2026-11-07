import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AddItemForm from "./AddItemForm";
import ItemCard, { type Item } from "./ItemCard";
import DangerZone from "./DangerZone";

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

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 6 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center", mb: 1 }}
        >
          <Typography variant="h4" component="h1">
            My list
          </Typography>
          <form action="/auth/signout" method="post">
            <Button type="submit" variant="text" size="small">
              Log out
            </Button>
          </form>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Signed in as {user.email}
        </Typography>

        <AddItemForm />

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
              Nothing parked yet 🌱
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Next time you feel the urge to buy, park it above instead. Come
              back whenever you like — no rush, no guilt.
            </Typography>
          </Paper>
        ) : (
          <Stack spacing={2}>
            {list.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </Stack>
        )}

        <DangerZone hasItems={list.length > 0} />
      </Box>
    </Container>
  );
}
