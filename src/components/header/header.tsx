/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { FaRegBell } from "react-icons/fa";
import Image from "next/image";
import { User } from "@/types/user/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "@/store/useAuthStore";
import useGroupStore from "@/store/useGroupStore";
import useFileStore from "@/store/useFileStore";
import { toast } from "@/hooks/use-toast";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { useParams, useRouter } from "next/navigation";
import ProfileModal from "../modal/profileModal";
import { TeamUser } from "@/types/dashboard/dashboard";

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

async function fetchTeamUserData(id: string): Promise<TeamUser> {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/team/${id}/me`
  );
  const data = await response.json();
  return data.result;
}

function Header({ toggleSidebar }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const accessToken = useAuthStore((state) => state.accessToken);
  const setUser = useAuthStore((state) => state.setUser);
  const setTeamUser = useAuthStore((state) => state.setTeamUser);
  const clearSession = useAuthStore((state) => state.clearSession);
  const setGroupId = useGroupStore((state) => state.setGroupId);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery<User | TeamUser>({
    queryKey: ["userData", id || "default"],
    queryFn: () => (id ? fetchTeamUserData(id as string) : fetchUserData()),
    enabled: !!accessToken,
    select: (data: User | TeamUser) => {
      if ("teamId" in data) {
        setTeamUser(data);
        return data;
      } else {
        setUser(data);
        return data;
      }
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        { method: "POST" }
      );
      if (!response.ok) throw new Error("Logout request failed");
    },
    onSuccess: () => {
      clearSession();
      setGroupId(0);
      useFileStore.getState().clearFiles();
      queryClient.clear();
      setIsModalOpen(false);
      router.replace("/");
    },
    onError: () => {
      toast({ title: "로그아웃하지 못했습니다", description: "잠시 후 다시 시도해 주세요." });
    },
  });

  const handleProfileClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  // if (isError) {
  //   alert("로그인을 먼저 해주세요");
  // }

  return (
    <div className="flex justify-between w-full h-[70px] p-[20px] bg-headerBg fixed top-0 z-40">
      <div className="flex items-center">
        <IoIosMenu
          className="w-[23px] h-[23px] text-gray-500 cursor-pointer mr-[20px] xl:hidden"
          onClick={toggleSidebar}
        />
        <span
          className="text-[#C9D439] text-[1.4rem] cursor-pointer"
          onClick={() => router.push(`/dashboard/${id ? id : ""}`)}
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
            className="w-[30px] h-[30px] cursor-pointer"
            onClick={handleProfileClick}
          >
            {data && (
              <Image
                src={
                  "teamId" in data
                    ? data.imgUrl || "/Avatar.png"
                    : data.profileImageUrl || "/Avatar.png"
                }
                alt="user img"
                layout="fill"
                className="rounded-full object-cover"
                priority={true}
              />
            )}
          </div>
          <ProfileModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onLogout={() => logout.mutate()}
            isLoggingOut={logout.isPending}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
