import { motion } from "framer-motion";
import Image from "next/image";
import SidebarItem from "./sidebar.item";
import useAuthStore from "@/store/useAuthStore";

interface SidebarProps {
  isSidebarOpen: boolean;
}

function Sidebar({ isSidebarOpen }: SidebarProps) {
  return (
    <>
      <div
        className="hidden lg:block w-[300px] bg-white shadow-xl"
        style={{ height: "calc(100vh - 70px)" }}
      >
        <Content />
      </div>

      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isSidebarOpen ? "0%" : "-100%" }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        className="fixed lg:hidden w-[300px] z-40 bg-white shadow-xl"
        style={{
          height: "calc(100vh - 70px)", // 헤더 높이를 제외한 높이
          top: "70px",
        }}
      >
        <Content />
      </motion.div>
    </>
  );
}

function Content() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="h-full p-[20px] flex flex-col items-center bg-white lg:bg-sidebarBg">
      {/* 모임명 */}
      <section className="w-full flex flex-col items-start mb-[20px]">
        <div className="w-full flex items-center justify-between cursor-pointer">
          <div className="w-full flex items-center justify-center">
            <div className="rounded-full p-[5px] border-[2.5px] w-[40px] h-[40px] overflow-hidden mr-[10px] relative">
              {user?.profileImageUrl ? (
                <Image
                  src={user?.profileImageUrl}
                  alt="user img"
                  layout="fill"
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-[30px] h-[30px] bg-gray-300 rounded-full"></div>
              )}
            </div>
            <span className="text-[1.1rem] mt-[3px]">OurMeeting</span>
          </div>
        </div>
      </section>
      <div className="w-full border-[1px] border-gray-[rgba(0,0,0,0.05)] mt-[10px]"></div>

      <main className="w-[80%] flex flex-col items-center">
        <SidebarItem />
      </main>
      <button
        className="mt-[10px] px-[15px] py-[8px] text-sm text-white bg-logoColor rounded-md hover:bg-blue-600 transition"
        onClick={() => alert("모임 생성하기 클릭!")}
      >
        모임 생성하기
      </button>
    </div>
  );
}

export default Sidebar;
