import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Providers from "./providers";
import { getLang } from "@/i18n/server";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Park & Revisit",
  description:
    "A calm, number-free way to pause before a purchase, wait, and decide.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const lang = await getLang();
  return (
    <html lang={lang} className={geistSans.variable} suppressHydrationWarning>
      <body>
        <Providers>
          <LanguageProvider lang={lang}>{children}</LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
