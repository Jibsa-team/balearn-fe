"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SidebarItem from "./sidebar.item";
import useAuthStore from "@/store/useAuthStore";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import JoinGroupModal from "@/components/modal/joinGroupModal"; // Import the modal component
import { useParams } from "next/navigation";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth"; // Assuming you have a fetchWithAuth function
import { DashboardType } from "@/types/dashboard/dashboard";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

function Sidebar({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [teamInfo, setTeamInfo] = useState<{
    name: string;
    imageUrl: string;
  } | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchTeamInfo = async () => {
      if (id) {
        const response = await fetchWithAuth(
          `${process.env.NEXT_PUBLIC_API_URL}/api/team/${id}`
        );
        if (response.ok) {
          const data: DashboardType = await response.json();
          console.log(data);
          setTeamInfo({
            name: data.result.team.name,
            imageUrl: data.result.team.imgUrl,
          });
        }
      }
    };

    fetchTeamInfo();
  }, [id]);

  const handleOpenModal = () => {
    setIsSidebarOpen(false);
    setIsJoinModalOpen(true);
  };
  const handleCloseModal = () => setIsJoinModalOpen(false);
  const handleJoinGroup = () => {
    console.log("모임에 가입했습니다!");
    setIsJoinModalOpen(false);
  };

  return (
    <>
      <div
        className="hidden lg:block w-[300px] bg-white shadow-xl"
        style={{ height: "calc(100vh - 70px)" }}
      >
        <Content handleOpenModal={handleOpenModal} teamInfo={teamInfo} />
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
        <Content handleOpenModal={handleOpenModal} teamInfo={teamInfo} />
      </motion.div>

      <JoinGroupModal
        isOpen={isJoinModalOpen}
        onClose={handleCloseModal}
        onJoin={handleJoinGroup}
      />
    </>
  );
}

function Content({
  handleOpenModal,
  teamInfo,
}: {
  handleOpenModal: () => void;
  teamInfo: { name: string; imageUrl: string } | null;
}) {
  const user = useAuthStore((state) => state.user);

  console.log(teamInfo);

  return (
    <div className="h-full p-[20px] flex flex-col items-center justify-between bg-white lg:bg-sidebarBg">
      <div>
        <section className="w-full flex flex-col items-start mb-[20px]">
          <div className="w-full flex items-center justify-between cursor-pointer">
            <div className="w-full flex items-center justify-center">
              <div className="rounded-full p-[5px] border-[2.5px] w-[40px] h-[40px] overflow-hidden mr-[10px] relative">
                {teamInfo?.imageUrl ? (
                  <Image
                    src={teamInfo?.imageUrl}
                    alt="team img"
                    layout="fill"
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-[30px] h-[30px] bg-gray-300 rounded-full"></div>
                )}
              </div>
              <span className="text-[1.1rem] mt-[3px]">{teamInfo?.name}</span>
            </div>
          </div>
        </section>
        <div className="w-full border-[1px] border-gray-[rgba(0,0,0,0.05)] mt-[10px]"></div>

        <main className="w-[80%] flex flex-col items-center">
          <SidebarItem />
        </main>
      </div>

      <div className="w-full flex flex-col items-center">
        <Link href={"/group"}>
          <button className="mt-[10px] px-[40px] py-[8px] text-sm text-white bg-logoColor rounded-lg">
            모임 생성하기
          </button>
        </Link>
        <button
          onClick={handleOpenModal}
          className="mt-[10px] px-[40px] py-[8px] text-sm text-white bg-logoColor rounded-lg cursor-pointer"
        >
          모임 가입하기
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
