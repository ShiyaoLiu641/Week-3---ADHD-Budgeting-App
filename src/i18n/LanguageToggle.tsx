"use client";

import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useLang } from "./LanguageProvider";

// A small button that flips between English and Chinese.
// It shows the language you would switch TO (so in English it reads "中文").
export default function LanguageToggle() {
  const lang = useLang();
  const router = useRouter();
  const next = lang === "en" ? "zh" : "en";

  function switchLanguage() {
    // Save the choice for a year so it sticks across visits.
    document.cookie = `lang=${next}; path=/; max-age=31536000`;
    // Re-render the page (server + client) in the new language.
    router.refresh();
  }

  return (
    <Button
      onClick={switchLanguage}
      size="small"
      variant="text"
      aria-label={next === "zh" ? "切换到中文" : "Switch to English"}
    >
      {next === "zh" ? "中文" : "EN"}
    </Button>
  );
}
