"use client";

import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import SidebarItem from "./sidebar.item";
import { useState } from "react";
import GroupAddModal from "../modal/groupAddModal";

function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const openDeleteModal = (e: React.MouseEvent<HTMLDivElement>) => {
    const headerRect = e.currentTarget.getBoundingClientRect();
    setModalPosition({
      top: headerRect.bottom, // 헤더 아래에 모달을 배치
      left: headerRect.left, // 헤더의 왼쪽 정렬
    });
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    closeDeleteModal();
  };

  return (
    <div className="h-screen w-3/12 p-[20px] pt-[40px] flex flex-col items-center bg-sidebarBg">
      <header
        className="text-2xl text-gray-600 flex items-center cursor-pointer"
        onClick={openDeleteModal}
      >
        <span>OurMeeting</span>
        <IoIosArrowDown className="ml-[10px] mt-[5px] text-[1.3rem]" />
      </header>
      <section className="mt-[100px] flex flex-col items-center">
        <div>
          <div className="flex justify-between">
            <div></div>
            <BsThreeDots className="cursor-pointer text-unActiveColor" />
          </div>
          <div className="rounded-full p-2 border-[2.5px] border-logoColor w-[150px] h-[150px]">
            <Image
              src="/Avatar.png"
              width={140}
              height={140}
              alt="profile image"
              className="object-cover"
            />
          </div>
          <div className="mt-[20px] flex flex-col justify-center text-center">
            <span>Hello JaeIn</span>
            <span className="text-gray-400">ysy06053@gmail.com</span>
          </div>
        </div>
      </section>
      <main className="mt-[10px] flex flex-col items-center">
        <SidebarItem />
      </main>

      <GroupAddModal
        isOpen={isModalOpen}
        position={modalPosition} // 모달 위치 전달
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default Sidebar;
