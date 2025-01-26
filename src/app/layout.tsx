import "./globals.css";
import Providers from "./lib/provides";
import { Toaster } from "@/components/ui/toaster";
import { Prompt } from "next/font/google";

const poppins = Prompt({
  weight: "500",
  subsets: ["latin", "latin-ext"],
});

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
