import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/**
 * Root layout — wraps every page in the app.
 *
 * In Next.js App Router, `layout.tsx` is the single React tree that owns
 * <html> and <body>. Each route segment can supply its own nested layout,
 * but this one is always the outermost shell.
 *
 * Fonts are loaded via `next/font/local` from the variable WOFF files in
 * ./fonts. `next/font` self-hosts the font (no external request to Google),
 * generates a CSS variable, and applies `font-display: swap` automatically.
 */

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Zeeshan Bandar — Mission Control",
    template: "%s · Zeeshan Bandar",
  },
  description:
    "Senior full-stack engineer shipping production systems. React, Python, Go.",
  metadataBase: new URL("https://zeeshan.dev"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-background-deep text-foreground antialiased">
        {/*
         * Breathing grid backdrop — fixed, behind everything, ignores
         * pointer events. Per PORTFOLIO_BRIEF.md §2 visual signature.
         */}
        <div
          aria-hidden
          className="bg-mc-grid pointer-events-none fixed inset-0 -z-10"
        />
        {children}
      </body>
    </html>
  );
}
