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
            <main className="w-[95%] h-[90vh] bg-white shadow-md p-10">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
