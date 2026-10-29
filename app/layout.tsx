import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { pitch } from "../lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "otis.systems";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https");
  const origin = `${protocol}://${host}`;
  const socialImage = new URL("/og.png", origin).toString();

  return {
    metadataBase: new URL(origin),
    title: "Otis IDE | Run a fleet of coding agents on your Mac",
    description:
      "Run a fleet of Claude Code and Codex agents in parallel on your Mac, each in its own worktree, branch and port. Free, uses your existing subscription.",
    icons: {
      icon: "/brand/otis-mark.svg",
      shortcut: "/brand/otis-mark.svg",
      apple: "/brand/otis-180.png",
    },
    openGraph: {
      title: "Otis IDE | Run a fleet of coding agents on your Mac",
      description: pitch,
      type: "website",
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "Otis IDE",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Otis IDE | Run a fleet of coding agents on your Mac",
      description: pitch,
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
