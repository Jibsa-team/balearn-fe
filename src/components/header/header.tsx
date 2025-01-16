/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { FaRegBell } from "react-icons/fa";
import Image from "next/image";
import { User } from "@/types/user/user";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "@/store/useAuthStore";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { useRouter } from "next/navigation";
import ProfileModal from "../modal/profileModal";

interface HeaderProps {
  toggleSidebar: () => void;
}

async function fetchUserData(): Promise<User> {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/me`
  );
  const data = await response.json();
  return data.result;
}

function Header({ toggleSidebar }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const accessToken = useAuthStore((state) => state.accessToken);
  const setUser = useAuthStore((state) => state.setUser);
  const clearAccessToken = useAuthStore((state) => state.clearAccessToken);
  const clearUser = useAuthStore((state) => state.clearUser);
  const router = useRouter();

  const { data, isLoading, isError } = useQuery<User>({
    queryKey: ["userData", accessToken],
    queryFn: () => fetchUserData(),
    enabled: !!accessToken,
    select: (data: User) => {
      setUser(data);
      return data;
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("auth-storage");
    clearAccessToken();
    clearUser();
    router.push("/"); // 로그아웃 후 이동할 경로
  };

  const handleProfileClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  if (isError) {
    alert("로그인을 먼저 해주세요");
  }

  return (
    <div className="flex justify-between w-full h-[70px] p-[20px] bg-headerBg fixed top-0">
      <div className="flex items-center">
        <IoIosMenu
          className="w-[23px] h-[23px] text-gray-500 cursor-pointer mr-[20px] lg:hidden"
          onClick={toggleSidebar}
        />
        <span
          className="text-[#C9D439] text-[1.4rem] cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          Balearn
        </span>
      </div>
      <div className="flex items-center md:mr-[30px] relative">
        <div className="relative md:flex">
          <FaRegBell className="w-[23px] h-[23px] text-gray-500" />
          <div className="absolute top-[-3px] right-[-3px] w-[8px] h-[8px] bg-logoColor rounded-full"></div>
        </div>
        <div className="ml-[20px] md:block relative">
          <div
            className="w-[30px] h-[30px] relative cursor-pointer"
            onClick={handleProfileClick}
          >
            {data?.profileImageUrl ? (
              <Image
                src={data?.profileImageUrl}
                alt="user img"
                layout="fill"
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-[30px] h-[30px] bg-gray-300 rounded-full"></div>
            )}
          </div>
          <ProfileModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
