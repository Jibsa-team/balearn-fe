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
        <div className="flex">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <div
            className="w-full flex justify-center py-0 overflow-y-auto"
            style={{
              height: "calc(100vh - 70px)",
            }}
          >
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
