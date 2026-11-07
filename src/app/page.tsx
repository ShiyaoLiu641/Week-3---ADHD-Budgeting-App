import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Home() {
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
        <Typography variant="h3" component="h1">
          Park &amp; Revisit
        </Typography>
        <Typography variant="h6" component="p" color="text.secondary">
          Tempted to buy something? Park it here, take a breath, and decide
          later — no numbers, no guilt.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button href="/items" variant="contained" size="large">
            Park an item
          </Button>
          <Button href="/login" variant="outlined" size="large">
            Log in
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
