import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DevToolkit Hub — Tools That Developers Love",
  description:
    "Your all-in-one Swiss Army knife for developer tasks — from decoding JWTs to cryptographic key generation, base conversions, and more.",
  keywords:
    "developer tools, JWT decoder, crypto tools, base64, JSON formatter, text manipulation, UUID generator, network tools, timestamp converter, QR code generator",
  authors: [{ name: "DevToolkit Hub" }],
  creator: "DevToolkit Hub",
  publisher: "DevToolkit Hub",
  robots: "index, follow",
  metadataBase: new URL("https://dev.sakhia.us"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dev.sakhia.us",
    title: "DevToolkit Hub — Tools That Developers Love",
    description:
      "Your all-in-one Swiss Army knife for developer tasks — from decoding JWTs to cryptographic key generation, base conversions, and more.",
    siteName: "DevToolkit Hub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevToolkit Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevToolkit Hub — Tools That Developers Love",
    description:
      "Your all-in-one Swiss Army knife for developer tasks — from decoding JWTs to cryptographic key generation, base conversions, and more.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.png",
        color: "#4f46e5",
      },
    ],
  },
  manifest: "/site.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light"  disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
