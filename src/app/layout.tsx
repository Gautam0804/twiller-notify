import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Twiller 🔔",
  description:
    "Smart keyword notifications for tweets built with Next.js and Tailwind CSS.",

  keywords: [
    "twitter",
    "notifications",
    "nextjs",
    "tailwind",
    "tweet tracker",
  ],

  authors: [
    {
      name: "Gautam Yadav",
    },
  ],

  creator: "Gautam Yadav",

  openGraph: {
    title: "Twiller 🔔",
    description:
      "Receive smart notifications when important keywords appear in tweets.",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Twiller 🔔",
    description:
      "Smart keyword notifications powered by Next.js.",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <body
        className={`
          ${inter.className}
          min-h-screen
          antialiased
          transition-all
          duration-300
          bg-gradient-to-br
          from-slate-100
          via-white
          to-slate-200
          text-slate-900
          dark:from-slate-950
          dark:via-slate-900
          dark:to-black
          dark:text-slate-100
        `}
      >
        {/* Background Effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden">

          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full" />

          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />

          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Main App */}
        <div className="relative">
          {children}
        </div>
      </body>
    </html>
  );
}