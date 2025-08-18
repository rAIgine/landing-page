"use client";
import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>rAIgine - Remote Desktop Automation Platform</title>
        <meta
          name="description"
          content="Make automation as easy as one click. Control desktop applications remotely for manufacturing, data entry, and business workflows."
        />
        <meta
          name="keywords"
          content="remote desktop automation, manufacturing automation, workflow automation, business process automation"
        />
        <meta name="generator" content="v0.dev" />

        {/* OpenGraph meta tags */}
        <meta
          property="og:title"
          content="rAIgine - Remote Desktop Automation Platform"
        />
        <meta
          property="og:description"
          content="Make automation as easy as one click. Control desktop applications remotely for manufacturing, data entry, and business workflows."
        />
        <meta property="og:url" content="https://raigine.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/raigine_logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="rAIgine Automation Platform" />

        {/* Twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="rAIgine - Remote Desktop Automation"
        />
        <meta
          name="twitter:description"
          content="Make automation as easy as one click. Perfect for manufacturing and business workflows."
        />

        {/* Favicons */}
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/raigine_logo.png"
        />
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
