import { motion } from "framer-motion";
import Image from "next/image";
import SidebarItem from "./sidebar.item";
import { IoIosArrowForward } from "react-icons/io";

interface SidebarProps {
  isSidebarOpen: boolean;
}

function Sidebar({ isSidebarOpen }: SidebarProps) {
  return (
    <motion.div
      initial={{ x: "-100%" }} // 초기 위치 (화면 밖)
      animate={{ x: isSidebarOpen ? "0%" : "-100%" }} // 열리고 닫히는 애니메이션
      transition={{ type: "spring", stiffness: 200, damping: 30 }} // 애니메이션 효과
      className="fixed w-[300px] z-40 bg-white shadow-xl"
      style={{
        height: "calc(100vh - 70px)", // 헤더 높이를 제외한 높이
        top: "70px", // 헤더 아래로 이동
      }}
    >
      <div className="p-[20px] flex flex-col items-center">
        {/* 모임명 */}
        <section className="w-full flex flex-col items-start mb-[20px]">
          <div className="w-full flex items-center justify-between cursor-pointer">
            <div className="w-full flex items-center">
              <div className="rounded-full p-[5px] border-[2.5px] w-[40px] h-[40px] overflow-hidden mr-[10px]">
                <Image
                  src="/Avatar.png"
                  width={50}
                  height={50}
                  alt="group profile"
                  className="object-cover"
                />
              </div>
              <span className="text-[1.1rem] mt-[3px]">OurMeeting</span>
            </div>
            <IoIosArrowForward className="text-[1.1rem] mt-[3px]" />
          </div>
          <div className="w-full flex items-center justify-between cursor-pointer">
            <div className="w-full flex items-center">
              <div className="rounded-full p-[5px] border-[2.5px] w-[40px] h-[40px] overflow-hidden mr-[10px]">
                <Image
                  src="/Avatar.png"
                  width={50}
                  height={50}
                  alt="group profile"
                  className="object-cover"
                />
              </div>
              <span className="text-[1.1rem] mt-[3px]">OurMeeting</span>
            </div>
            <IoIosArrowForward className="text-[1.1rem] mt-[3px]" />
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
    </motion.div>
  );
}

export default Sidebar;
