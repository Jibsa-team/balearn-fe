"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SidebarItem from "./sidebar.item";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import JoinGroupModal from "@/components/modal/joinGroupModal";
import { useParams } from "next/navigation";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { IoIosArrowDown } from "react-icons/io";
import SidebarDropdown from "./sidebar.dropdown";
import { HiPlusCircle } from "react-icons/hi2";
import { FaUserFriends } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { Team } from "@/types/dashboard/dashboard";
import TeamInfoSkeleton from "../skeleton/teamInfoSkelton";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

async function fetchTeamInfo(id: string) {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/team/${id}`
  );
  if (!response.ok) throw new Error("Team not found");
  const data = await response.json();
  return data.result.team;
}

function Sidebar({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["teamInfo", id],
    queryFn: () => fetchTeamInfo(id as string),
    enabled: !!id,
  });

  const handleOpenModal = () => {
    setIsSidebarOpen(false);
    setIsJoinModalOpen(true);
  };
  const handleCloseModal = () => setIsJoinModalOpen(false);

  return (
    <>
      <div
        className="hidden xl:block w-[300px] bg-white shadow-xl flex-shrink-0"
        style={{ height: "calc(100vh - 70px)" }}
      >
        <Content
          handleOpenModal={handleOpenModal}
          teamInfo={data}
          isLoading={isLoading}
          isError={isError}
        />
      </div>

      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isSidebarOpen ? "0%" : "-100%" }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        className="fixed lg:hidden w-[300px] z-40 bg-white shadow-xl"
        style={{
          height: "calc(100vh - 70px)",
          top: "70px",
        }}
      >
        <Content
          handleOpenModal={handleOpenModal}
          teamInfo={data}
          isLoading={isLoading}
          isError={isError}
        />
      </motion.div>

      <JoinGroupModal
        isOpen={isJoinModalOpen}
        onClose={handleCloseModal}
        sidebarModalClose={setIsJoinModalOpen}
      />
    </>
  );
}

function Content({
  handleOpenModal,
  teamInfo,
  isLoading,
}: {
  handleOpenModal: () => void;
  teamInfo: Team | null;
  isLoading: boolean;
  isError: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { id } = useParams();

  return (
    <div className="h-full p-[20px] flex flex-col items-center justify-between bg-white lg:bg-sidebarBg">
      <div>
        <section className="w-full flex flex-col items-start mb-[20px]">
          <div className="w-full flex items-center justify-between cursor-pointer">
            <div
              className="w-full flex items-center justify-between"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isLoading ? (
                <TeamInfoSkeleton />
              ) : (
                teamInfo && (
                  <>
                    <div className="flex items-center">
                      <div className="rounded-full p-[5px] border-[2.5px] w-[40px] h-[40px] overflow-hidden mr-[10px] relative">
                        <Image
                          src={teamInfo.imgUrl}
                          alt="team img"
                          layout="fill"
                          className="rounded-full object-cover"
                        />
                      </div>
                      <span className="text-[1.1rem] mt-[3px]">
                        {teamInfo.name}
                      </span>
                    </div>
                    <IoIosArrowDown />
                  </>
                )
              )}
            </div>
          </div>
        </section>
        {isOpen && <SidebarDropdown setIsOpen={setIsOpen} />}
        <div className="w-full border-[1px] border-gray-[rgba(0,0,0,0.05)] mt-[10px]"></div>

        <main className="w-[100%] flex flex-col items-center">
          <SidebarItem />
        </main>
      </div>

      <div className="w-full flex flex-col items-start">
        <Link
          href={`/setting/${id ? id : ""}/group-create`}
          className="cursor-pointer group w-full flex justify-center"
        >
          <div className="w-full flex justify-center items-center mt-[10px] text-[1rem] text-[rgba(0,0,0,0.6)]">
            <HiPlusCircle className="text-[rgba(0,0,0,0.2)] group-hover:text-[rgba(0,0,0,0.4)] text-[1.6rem] mr-[10px]" />
            <span className="text-[1.1rem] text-[rgba(0,0,0,0.4)] group-hover:text-[rgba(0,0,0,0.6)]">
              모임 생성하기
            </span>
          </div>
        </Link>
        <div
          onClick={handleOpenModal}
          className="flex justify-center items-center mt-[10px] text-[1rem] text-[rgba(0,0,0,0.6)] cursor-pointer group w-full"
        >
          <FaUserFriends className="text-[rgba(0,0,0,0.2)] group-hover:text-[rgba(0,0,0,0.4)] text-[1.6rem] mr-[10px]" />
          <span className="text-[1.1rem] text-[rgba(0,0,0,0.4)] group-hover:text-[rgba(0,0,0,0.6)]">
            모임 가입하기
          </span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
