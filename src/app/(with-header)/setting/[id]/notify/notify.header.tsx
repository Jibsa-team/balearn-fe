"use client";

import React, { useState } from "react";
import { FaPen } from "react-icons/fa6";
import CreateNotifyModal from "./createNotify.modal";

function NotifyHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="mb-[40px] flex items-center justify-between border-b-[1px] border-gray-400 pb-[20px]">
        <span className="text-[1.3rem] font-semibold">공지 관리</span>
        <FaPen
          className="text-[20px] text-logoColor cursor-pointer"
          onClick={handleOpenModal}
        />
      </header>
      <CreateNotifyModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}

export default NotifyHeader;
