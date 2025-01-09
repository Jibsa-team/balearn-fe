"use client";

import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import { ReactNode, useState } from "react";
import SidebarClose from "@/components/sidebar/sidebar.close";

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
          <Sidebar isSidebarOpen={isSidebarOpen} />
          <div className={"w-full mt-[70px] flex"}>
            {/* <SidebarClose /> */}
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
