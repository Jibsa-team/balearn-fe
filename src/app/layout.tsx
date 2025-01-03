import Header from "@/components/header/header";
import "./globals.css";
import Sidebar from "@/components/sidebar/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar />
          <div className="flex flex-col w-full bg-sidebarBg">
            <Header />
            <main className="p-10 flex flex-1 justify-center items-center">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
