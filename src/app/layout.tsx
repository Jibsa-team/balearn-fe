import "./globals.css";
import Providers from "./lib/provides";

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
        </Providers>
      </body>
    </html>
  );
}
