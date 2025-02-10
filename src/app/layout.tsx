import { Metadata } from "next";
import "./globals.css";
import Providers from "./lib/provides";
import { Toaster } from "@/components/ui/toaster";
import { Prompt } from "next/font/google";

const poppins = Prompt({
  weight: "500",
  subsets: ["latin", "latin-ext"],
});

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
        url: "/icons/logo2.png",
        width: 1200,
        height: 630,
        alt: "depromeet",
      },
    ],
    url: "https://your-domain.com",
    siteName: "사이트 이름",
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
    icon: "/icons/logo2.png",
    apple: "/icons/logo2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <Providers>
          <div className="flex w-full">{children}</div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
