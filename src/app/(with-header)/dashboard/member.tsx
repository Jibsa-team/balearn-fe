"use client";

import useAuthStore from "@/store/useAuthStore";
import Image from "next/image";
import React from "react";

function Member() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="mb-[80px]">
      <h1 className="text-2xl font-semibold text-gray-700">Study Member</h1>
      <div className="mt-[20px] flex overflow-x-scroll whitespace-nowrap hide-scrollbar">
        <div className="flex flex-col items-center mr-[10px]">
          {user?.profileImageUrl ? (
            <div className="rounded-full p-[5px] border-[2.5px] w-[120px] h-[120px] overflow-hidden relative">
              <Image
                src={user?.profileImageUrl}
                alt="user img"
                layout="fill"
                className="rounded-full object-cover"
              />
            </div>
          ) : (
            <div className="w-[30px] h-[30px] bg-gray-300 rounded-full"></div>
          )}
          <span className="mt-4 text-gray-700 font-medium text-center">
            재인(스터디장)
          </span>
        </div>
      </div>
    </div>
  );
}

export default Member;
