import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://akashpandey.dev"),
  title: "AKASH PANDEY | Full-Stack JavaScript Developer",
  description:
    "Portfolio of Akash Pandey, a Full-Stack JavaScript Developer specializing in React.js, Node.js, Express.js, TypeScript, Prisma and modern web application development.",
  keywords: [
    "Akash Pandey",
    "Full-Stack JavaScript Developer",
    "React.js Developer",
    "Node.js Developer",
    "Frontend Developer",
    "Backend Developer",
    "TypeScript",
    "Prisma",
    "Surat",
    "India",
  ],
  authors: [{ name: "Akash Pandey" }],
  creator: "Akash Pandey",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://akashpandey.dev",
    title: "AKASH PANDEY | Full-Stack JavaScript Developer",
    description:
      "Portfolio of Akash Pandey, a Full-Stack JavaScript Developer specializing in React.js, Node.js, Express.js, TypeScript, Prisma and modern web application development.",
    siteName: "Akash Pandey Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Akash Pandey — Full-Stack JavaScript Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AKASH PANDEY | Full-Stack JavaScript Developer",
    description:
      "Portfolio of Akash Pandey, a Full-Stack JavaScript Developer specializing in React.js, Node.js, Express.js, TypeScript, Prisma and modern web application development.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://akashpandey.dev" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className} suppressHydrationWarning>{children}</body>
    </html>
  );
}
