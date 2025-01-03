import React from "react";
import { MdDashboard } from "react-icons/md";
import { FaRegCalendarMinus } from "react-icons/fa";
import { FaCloud } from "react-icons/fa";
import { TbMessage2Filled } from "react-icons/tb";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";
import Link from "next/link";

const categories = [
  {
    name: "Dashboard",
    icon: <MdDashboard className="text-[20px]" />,
    url: "/",
  },
  {
    name: "Calendars",
    icon: <FaRegCalendarMinus className="text-[20px]" />,
    url: "/calendars",
  },
  {
    name: "Message",
    icon: <TbMessage2Filled className="text-[20px]" />,
    url: "/chat",
  },
  {
    name: "Files",
    icon: <FaCloud className="text-[20px]" />,
    url: "/files",
  },
  {
    name: "Setting",
    icon: <HiMiniWrenchScrewdriver className="text-[20px]" />,
    url: "/setting",
  },
];

function SidebarItem() {
  return (
    <div className="mt-10 grid grid-cols-2 w-full cursor-pointer">
      {categories.map((e, i) => {
        return (
          <Link href={e.url} key={i}>
            <div className="group flex flex-col justify-center items-center w-[100px] h-[100px] rounded-lg border-gray-200 border-[1px] transition-all duration-200 hover:scale-110 hover:bg-white hover:shadow-md">
              <div className="text-unActiveColor group-hover:text-logoColor">
                {e.icon}
              </div>
              <span className="mt-2 text-[13px] text-unActiveColor group-hover:text-logoColor">
                {e.name}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default SidebarItem;
