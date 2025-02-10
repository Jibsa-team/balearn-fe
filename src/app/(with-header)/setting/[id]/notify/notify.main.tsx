"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import NotifyModal from "./notify.setting.modal";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { useParams } from "next/navigation";
import TeamNotifySkeleton from "@/components/skeleton/teamNotifySkelton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { NotifyDate } from "@/app/lib/date";
import Empty from "@/components/empty/empty";

const getAllNotify = async ({
  pageParam = 1,
  id,
}: {
  pageParam: number;
  id: string;
}) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/notice/team/${id}?page=${pageParam}&size=10`
  );
  if (!response.ok) throw new Error("데이터 로드 실패");
  return response.json();
};

function NotifyMain() {
  const [activeModalId, setActiveModalId] = useState<number | null>(null);
  const { id } = useParams();
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["teamNotify", id],
      queryFn: ({ pageParam = 1 }) =>
        getAllNotify({ pageParam, id: id as string }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.result.hasNext ? allPages.length + 1 : undefined,
    });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  const handleToggleModal = (id: number) => {
    setActiveModalId((prev) => (prev === id ? null : id));
  };

  const handleCloseModal = () => {
    setActiveModalId(null);
  };

  if (isLoading) return <TeamNotifySkeleton count={10} />;
  if (isError) return <div>오류가 발생했습니다.</div>;
  if (!data || data.pages[0]?.result.content.length === 0)
    return <Empty message="등록된 공지가 없습니다" />;

  return (
    <>
      <>
        {data.pages
          .flatMap((page) => page.result.content)
          .map((notice) => (
            <div
              key={notice.id}
              className="flex flex-col items-start md:items-center border-b-[1px] border-gray-200 mb-[50px] pb-[10px]"
            >
              <div className="w-full text-[1rem] text-gray-800 font-semibold mb-[10px]">
                {NotifyDate(notice.createdAt)}
              </div>
              <div className="w-full flex justify-between sm:items-center items-start">
                <div className="w-full flex flex-col md:flex-row items-start md:items-center">
                  <div className="sm:w-[30%] w-[300px] flex items-center gap-4 mb-4 md:mb-0 md:mr-[20px]">
                    <div className="w-[30px] h-[30px] relative cursor-pointer">
                      <Image
                        src={notice.createdBy.imgUrl}
                        alt="user img"
                        layout="fill"
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="w-full sm:text-[1rem] text-[0.9rem]">
                      {notice.createdBy.nickname}
                    </div>
                  </div>
                  <div className="w-full text-[1rem]">
                    <span className="font-semibold mr-[10px]">[공지]</span>
                    <span>{`${notice.title}`}</span>
                  </div>
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
            </div>
          ))}
        <div ref={ref}>{hasNextPage && <TeamNotifySkeleton count={1} />}</div>
      </>
    </>
  );
}

export default NotifyMain;
