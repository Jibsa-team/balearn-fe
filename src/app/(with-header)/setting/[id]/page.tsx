"use client";

import React from "react";
import { RiGroupFill } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { AiFillNotification } from "react-icons/ai";
import Link from "next/link";
import { useParams } from "next/navigation";

const SettingItem = [
  {
    title: "모임 관리",
    subtitle: "모임을 관리해보세요.",
    description: "모임 관리 및 생성을 할 수 있습니다.",
    icon: <RiGroupFill className="mb-[25px] text-[1.3rem] text-gray-700" />,
    url: "group",
  },
  {
    title: "회원 관리",
    subtitle: "회원을 관리해보세요.",
    description: "회원 정보를 관리하고 역할을 할당할 수 있습니다.",
    icon: (
      <MdManageAccounts className="mb-[25px] text-[1.5rem] text-gray-700" />
    ),
    url: "userManage",
  },
  {
    title: "공지 관리",
    subtitle: "공지를 관리해보세요.",
    description: "공지를 생성하고 관리할 수 있습니다.",
    icon: (
      <AiFillNotification className="mb-[25px] text-[1.5rem] text-gray-700" />
    ),
    url: "notify",
  },
];

function Page() {
  const { id } = useParams();
  return (
    <div className="w-[95%] p-[30px] overflow-y-scroll">
      <h1 className="text-[1.5rem] font-semibold mb-[20px]">설정</h1>
      <div className="flex flex-wrap gap-[20px]">
        {SettingItem.map((item, i) => {
          return (
            <Link href={`/setting/${id}/${item.url}`} key={i}>
              <div className="w-[300px] border-[1px] border-gray-300 px-[20px] py-[30px] rounded-xl shadow-lg flex flex-col justify-between hover:bg-gray-400 hover:backdrop-blur-xl transition-all duration-200 group relative cursor-pointer">
                <div className="group-hover:opacity-10 transition-opacity duration-300">
                  {item.icon}
                </div>
                <div className="group-hover:opacity-10 transition-opacity duration-300">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <span className="text-gray-500 text-[0.9rem]">
                    {item.subtitle}
                  </span>
                </div>
                <div className="absolute top-1/2 left-0 w-full text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-[1rem] mt-[10px]">
                    {item.description}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Page;
