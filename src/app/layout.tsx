import { Metadata } from "next";
import "./globals.css";
import Providers from "./lib/provides";
import { Toaster } from "@/components/ui/toaster";
import localFont from "next/font/local";

const geist = localFont({ src: "./fonts/GeistVF.woff", display: "swap" });

export const metadata: Metadata = {
  title: "Balearn",
  description: "스터디 관리 서비스입니다",
  manifest: "/manifest.json",

  openGraph: {
    type: "website",
    title: "Balearn",
    description: "스터디 관리 서비스입니다",
    images: [
      {
        url: "/icons/logo_bg.png",
        width: 1200,
        height: 630,
        alt: "Balearn",
      },
    ],
    siteName: "Balearn",
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Balearn",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/icons/logo_bg.png",
    apple: "/icons/logo_bg.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <Providers>
          <div className="flex w-full h-full">{children}</div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
