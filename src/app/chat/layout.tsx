import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col w-full bg-sidebarBg">
      <div className="p-10 flex flex-1 justify-center items-center">
        {children}
      </div>
    </main>
  );
}
