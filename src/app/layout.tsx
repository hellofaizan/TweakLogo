import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LogoTweak - Free Online Logo Generator | Create Logos Like Canva",
  description:
    "Create stunning logos online with LogoTweak - the fastest free logo generator. Design professional logos with thousands of icons, custom colors, and instant downloads. No registration required. Make logos online like Canva but simpler and faster.",
  keywords: [
    "online logo generator",
    "free logo maker",
    "logo design tool",
    "create logo online",
    "logo generator free",
    "make logo online",
    "logo maker app",
    "professional logo design",
    "logo creator online",
    "custom logo generator",
    "logo design software",
    "logo maker tool",
    "create custom logo",
    "logo generator tool",
    "free logo creator",
    "online logo maker",
    "logo design online",
    "logo generator app",
    "make custom logo",
    "logo creator tool",
    "canva logo maker",
    "logo design generator",
    "free logo design tool",
    "online logo creator",
    "logo maker online",
    "custom logo maker",
    "logo generator online",
    "design logo online",
    "logo creation tool",
    "free online logo maker",
  ],
  authors: [{ name: "Mohammad Faizan" }],
  creator: "Mohammad Faizan",
  publisher: "LogoTweak",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://logotweak.mohammadfaizan.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LogoTweak - Free Online Logo Generator | Create Logos Like Canva",
    description:
      "Create stunning logos online with LogoTweak - the fastest free logo generator. Design professional logos with thousands of icons, custom colors, and instant downloads. No registration required.",
    url: "https://logotweak.mohammadfaizan.in",
    siteName: "LogoTweak",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "LogoTweak - Free Online Logo Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LogoTweak - Free Online Logo Generator | Create Logos Like Canva",
    description:
      "Create stunning logos online with LogoTweak - the fastest free logo generator. Design professional logos with thousands of icons, custom colors, and instant downloads.",
    images: ["/banner.png"],
    creator: "@mofaizandev",
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
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://logotweak.mohammadfaizan.in" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="LogoTweak" />
        <meta name="application-name" content="LogoTweak" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "LogoTweak",
              description:
                "Free online logo generator - create stunning logos with thousands of icons, custom colors, and instant downloads",
              url: "https://logotweak.mohammadfaizan.in",
              applicationCategory: "DesignApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Person",
                name: "Mohammad Faizan",
              },
              creator: {
                "@type": "Person",
                name: "Mohammad Faizan",
              },
              dateCreated: "2024-01-01",
              dateModified: new Date().toISOString().split("T")[0],
              featureList: [
                "Free online logo generator",
                "Thousands of customizable icons",
                "Custom color and gradient support",
                "Multiple export formats (PNG, JPG, SVG)",
                "High-resolution downloads",
                "No registration required",
                "Instant logo creation",
              ],
              screenshot: "https://logotweak.mohammadfaizan.in/banner.png",
              softwareVersion: "1.0.0",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className=" h-full">
            {children}
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
