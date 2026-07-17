import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

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
    title: "Otis — Your personal AI, at work",
    description:
      "Otis brings your context, projects, and desktop actions together—with you in control.",
    icons: {
      icon: "/brand/otis-mark.svg",
      shortcut: "/brand/otis-mark.svg",
      apple: "/brand/otis-180.png",
    },
    openGraph: {
      title: "Otis — Your personal AI, at work",
      description:
        "Your context. Your projects. Your desktop. One private workspace.",
      type: "website",
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "Otis — Your personal AI. At work.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Otis — Your personal AI, at work",
      description:
        "Your context. Your projects. Your desktop. One private workspace.",
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
