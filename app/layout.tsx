import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next"
import Navbar from "./components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jerkeyray.com"; // Update this with your actual domain

export const metadata: Metadata = {
  title: {
    default: "jerkeyray",
    template: "%s | jerkeyray",
  },
  description: "developer portfolio",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "jerkeyray",
    title: "jerkeyray",
    description: "developer portfolio",
    images: [
      {
        url: "/og-image.png", // Create this image (1200x630px)
        width: 1200,
        height: 630,
        alt: "jerkeyray",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "jerkeyray",
    description: "developer portfolio",
    images: ["/og-image.png"],
    creator: "@jerkeyray", // Update with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-6 py-10 min-h-screen flex flex-col`}
      >
        <header>
          <Navbar />
        </header>
        <main className="flex-1">{children}</main>
        <GoogleAnalytics gaId="G-XYZ123456" />
      </body>
    </html>
  );
}
