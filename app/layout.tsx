import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ediep.blog",
  description: "curated by eric diep",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        /* Progressier code */
        <link rel="manifest" href="https://progressier.app/JhJZFDQPWgkk74RuVmzj/progressier.json" />
        <script defer src="https://progressier.app/JhJZFDQPWgkk74RuVmzj/script.js" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}