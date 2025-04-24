import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
})

export const metadata = {
  title: "Ufarms UK - Empowering Sustainable Farming with Automation & AI",
  description:
    "Ufarms is at the forefront of AgriTech innovation, developing advanced indoor farming solutions to enable hyperlocal food production.",
  keywords:
    "hydroponics, farming automation, agritech, sustainable farming, indoor farming, UK agriculture, IoT farming",
  authors: [{ name: "Ufarms UK" }],
  // Add metadata for SSL and security
  verification: {
    google: "google-site-verification-code", // Replace with actual verification code if needed
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://ufarms.io/",
    siteName: "Ufarms UK",
    title: "Ufarms UK - Smart Farming Solutions",
    description: "Innovative indoor farming automation for everyone",
    images: [
      {
        url: "/og-image.jpg", // Replace with actual OG image path
        width: 1200,
        height: 630,
        alt: "Ufarms UK - Smart Farming Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ufarms UK - Smart Farming Solutions",
    description: "Innovative indoor farming automation for everyone",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Add security headers */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self';"
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Strict-Transport-Security" content="max-age=63072000; includeSubDomains; preload" />
        <link rel="canonical" href="https://ufarms.io/" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'