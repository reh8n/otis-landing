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
    title: "Otis | One intelligence. Four focused products.",
    description:
      "Meet the Otis ecosystem: focused AI products for personal work, business operations, and building software with agents.",
    icons: {
      icon: "/brand/otis-mark.svg",
      shortcut: "/brand/otis-mark.svg",
      apple: "/brand/otis-180.png",
    },
    openGraph: {
      title: "Otis | Your work has a new ecosystem",
      description:
        "Personal, Business, IDE, and Ecosystem: four focused products designed to feel like one calm system.",
      type: "website",
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "Otis | Your work has a new ecosystem.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Otis | Your work has a new ecosystem",
      description:
        "Personal, Business, IDE, and Ecosystem: four focused products designed to feel like one calm system.",
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
