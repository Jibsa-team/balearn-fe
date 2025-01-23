import "./globals.css";
import Providers from "./lib/provides";
import { Toaster } from "@/components/ui/toaster";

if (
  process.env.NEXT_RUNTIME === "nodejs" &&
  process.env.NODE_ENV !== "production"
) {
  (async () => {
    const { server } = await import("@/mocks/http");
    server.listen();
  })();
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex w-full">{children}</div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
