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
import { NotifyDate } from "@/app/lib/date";
import Empty from "@/components/empty/empty";

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

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index}>
            <TeamNotifySkeleton />
          </div>
        ))}
      </>
    );
  }

  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  if (!data || !data.result.content || data.result.content.length === 0) {
    return <Empty message={"등록된 공지가 없습니다"} />;
  }

  return (
    <>
      {data.result.content.map((notice) => (
        <div
          key={notice.id}
          className="flex justify-between md:items-center items-start border-b-[1px] border-gray-200 mb-[20px] pb-[10px]"
        >
          <div className="w-full flex flex-col md:flex-row items-start md:items-center">
            <div className="flex items-center gap-4 mb-4 md:mb-0 md:mr-[20px]">
              <div className="w-[30px] h-[30px] relative cursor-pointer mr-[5px]">
                <Image
                  src={user?.profileImageUrl as string}
                  alt="user img"
                  layout="fill"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="mt-[13px] ml-[5px]">
                <div className="text-[1rem]">{user!.name}</div>
                <div className="text-[0.8rem] text-gray-500">
                  {NotifyDate(notice.createdAt)}
                </div>
              </div>
            </div>
            <div className="w-full">{notice.title}</div>
          </div>
          <div className="md:mt-[0px] mt-[15px]">
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
      ))}
    </>
  );
}

export default NotifyMain;
