"use client";

import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import { ReactNode, useState } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex w-full">
      <main className="w-full bg-sidebarBg">
        <Header toggleSidebar={toggleSidebar} />
        <div className="w-full h-screen flex">
          <div className="mt-[70px] flex w-full">
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
