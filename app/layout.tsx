import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/styles/globals.css'

import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { ContentPlaceholder } from '@/components/content-placeholder'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevToolkit Hub — Tools That Developers Love',
  description:
    'Your all-in-one Swiss Army knife for developer tasks — from decoding JWTs to cryptographic key generation, base conversions, and more.',
  keywords:
    'developer tools, JWT decoder, crypto tools, base64, JSON formatter, text manipulation, UUID generator, network tools, timestamp converter, QR code generator',
  authors: [{ name: 'DevToolkit Hub' }],
  creator: 'DevToolkit Hub',
  publisher: 'DevToolkit Hub',
  robots: 'index, follow',
  metadataBase: new URL('https://dev.sakhia.us'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dev.sakhia.us',
    title: 'DevToolkit Hub — Tools That Developers Love',
    description:
      'Your all-in-one Swiss Army knife for developer tasks — from decoding JWTs to cryptographic key generation, base conversions, and more.',
    siteName: 'DevToolkit Hub',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DevToolkit Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevToolkit Hub — Tools That Developers Love',
    description:
      'Your all-in-one Swiss Army knife for developer tasks — from decoding JWTs to cryptographic key generation, base conversions, and more.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.png',
        color: '#4f46e5',
      },
    ],
  },
  manifest: '/site.webmanifest',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background h-full">
      <body className={cn(inter.className, 'h-full')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div>
            {/*  Static sidebar for desktop  */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
              {/*  Sidebar component, swap this element with another sidebar if you like  */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
                <ContentPlaceholder />
              </div>
            </div>

            <main className="py-10 lg:pl-72">
              <div className="px-4 sm:px-6 lg:px-8">{children}</div>
            </main>
          </div>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
