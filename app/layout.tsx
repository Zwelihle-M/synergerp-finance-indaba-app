import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/tools/next-theme-provider";
import Navigationbar from "@/components/navigationbar";
import { NextUI } from "@/tools/nextui-provider";

const telegraph = localFont({
  src: "./fonts/Telegraf.otf",
  variable: "--font-telegraf",
  weight: "100 900",
});
const telegrafLight = localFont({
  src: "./fonts/TelegrafLight.otf",
  variable: "--font-telegrafLight",
  weight: "100 900",
});
const telegrafBold = localFont({
  src: "./fonts/TelegrafUltraBold.otf",
  variable: "--font-telegrafBold",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SynergERP Finance Indaba ",
  description: "SynergERP Finance Indaba App HubSpot Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${telegraph.variable} ${telegrafLight.variable} ${telegrafBold.variable} font-[family-name:var(--font-telegraf)] antialiased`}
      >
        <NextUI>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Navigationbar />
            {children}
          </ThemeProvider>
        </NextUI>
      </body>
    </html>
  );
}
