"use client";

import useAuthStore from "@/store/useAuthStore";
import Image from "next/image";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import NotifyModal from "./notify.setting.modal";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import TeamNotifySkeleton from "@/components/skeleton/teamNotifySkelton";
import { NotificationDto } from "@/types/notify/teamNotifyDto";

const getAllNotify = async (
  teamId: number,
  page: number = 0,
  size: number = 10
): Promise<NotificationDto> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/notice/team/${teamId}?page=${page}&size=${size}`
  );
  if (!response.ok) {
    throw new Error("데이터를 가져오는데 실패했습니다.");
  }
  return response.json();
};

function NotifyMain() {
  const user = useAuthStore((state) => state.user);
  const [activeModalId, setActiveModalId] = useState<number | null>(null);
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["teamNotify", id],
    queryFn: () => getAllNotify(Number(id)!, 1, 10),
    enabled: !!id,
  });

  const handleToggleModal = (id: number) => {
    setActiveModalId((prev) => (prev === id ? null : id));
  };

  const handleCloseModal = () => {
    setActiveModalId(null);
  };

  if (isError) return <div>오류가 발생했습니다.</div>;

  return (
    <>
      {!isLoading
        ? data &&
          data.result.content.map((notice) => (
            <div
              key={notice.id}
              className="flex justify-between items-center border-b-[1px] border-gray-200 mb-[20px] pb-[10px]"
            >
              <div className="flex items-center">
                <div className="flex items-center mr-[30px]">
                  <div className="w-[30px] h-[30px] relative cursor-pointer mr-[5px]">
                    <Image
                      src={user?.profileImageUrl as string}
                      alt="user img"
                      layout="fill"
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <span>{user!.name}</span>
                  </div>
                </div>
                <div>{notice.title}</div>
              </div>
              <div>
                <div
                  className="cursor-pointer relative"
                  onClick={() => handleToggleModal(notice.id)}
                >
                  <BsThreeDots />
                  <NotifyModal
                    isOpen={activeModalId === notice.id}
                    onClose={handleCloseModal}
                    id={activeModalId}
                  />
                </div>
              </div>
            </div>
          ))
        : Array.from({ length: 10 }).map((_, index) => (
            <div key={index}>
              <TeamNotifySkeleton />
            </div>
          ))}
    </>
  );
}

export default NotifyMain;
