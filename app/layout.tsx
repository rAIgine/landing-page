import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "rAIgine - Remote Desktop Automation Platform",
  description: "Make automation as easy as one click. Control desktop applications remotely for manufacturing, data entry, and business workflows.",
  keywords: "remote desktop automation, manufacturing automation, workflow automation, business process automation",
  openGraph: {
    title: "rAIgine - Remote Desktop Automation Platform",
    description: "Make automation as easy as one click. Control desktop applications remotely for manufacturing, data entry, and business workflows.",
    url: "https://raigine.com",
    type: "website",
    images: [
      {
        url: "/raigine_logo.png",
        width: 1200,
        height: 630,
        alt: "rAIgine Automation Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "rAIgine - Remote Desktop Automation",
    description: "Make automation as easy as one click. Perfect for manufacturing and business workflows.",
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/raigine_logo.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
    generator: 'v0.dev'
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
