import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import PikachuAnimation from "./components/PikachuAnimation";
import FloralOverlay from "./components/FloralOverlay";
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
const GA_MEASUREMENT_ID = "G-0TGDV4RME6";

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
        url: "/opengraph-image",
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
    images: ["/opengraph-image"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-4 py-6 md:px-6 md:py-10 min-h-screen flex flex-col`}
      >
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script id="gtag-init">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-background focus:rounded focus:ring-3 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
        >
          Skip to main content
        </a>
        <header>
          <Navbar />
        </header>
        <FloralOverlay />
        <main id="main-content" className="flex-1">{children}</main>
        <PikachuAnimation />
        <Analytics />
      </body>
    </html>
  );
}
