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
  title: "Weather App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-purple-950 container flex flex-col  min-h-screen mx-auto  antialiased`}
      >
        <header className="mt-4 mb-auto text-3xl font-bold text-center text-yellow-100">Weather App</header>

        {children}

        <footer className="mt-auto text-center text-purple-800">made by cabbaj</footer>
      </body>
    </html>
  );
}
