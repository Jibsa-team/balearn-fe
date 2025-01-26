"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AiFillNotification } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaCrown } from "react-icons/fa";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { DashboardType } from "@/types/dashboard/dashboard";
import { useParams, useRouter } from "next/navigation";

import { IoIosArrowForward } from "react-icons/io";
import EmptyLogo from "@/components/empty/EmptyLogo";
import NotifySkeleton from "@/components/skeleton/notifySkelton";

const fetchNotifyData = async (
  id: string | string[]
): Promise<DashboardType> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/team/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch notify details");
  }
  return response.json();
};

function Notify() {
  const { id } = useParams();
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const { data, isLoading, isError } = useQuery<DashboardType>({
    queryKey: ["dashboardData", id],
    queryFn: () => fetchNotifyData(id),
  });

  if (isLoading) return <NotifySkeleton />;

  if (isError || !data?.result.notice) {
    return (
      <div
        onClick={() => router.push(`/setting/${id}/notify`)}
        className="mb-[30px] flex items-center justify-between md:w-[400px] w-full rounded-md px-[10px] border-[1px] border-[#6760DB] cursor-pointer"
      >
        <div className="flex items-center">
          <EmptyLogo width={50} height={50} />
          <span className="md:text-[1.1rem] text-[0.9rem] ml-[5px] mt-[5px]">
            공지를 등록 해보세요
          </span>
        </div>
        <IoIosArrowForward className="mt-[5px] text-[#6760DB] font-bold" />
      </div>
    );
  }

  return (
    <div className="mb-[40px] lg:w-[500px] sm:w-full cursor-pointer transition-all duration-200 border-[2px] border-logoColor p-[10px] rounded-md">
      <div
        className="flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <AiFillNotification className="text-logoColor font-bold text-2xl mr-2" />
          <span>{data.result.notice.title}</span>
        </div>
        {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      {isExpanded && (
        <div>
          <div className="mt-2 ml-[31px]">
            <p>{data.result.notice.detail}</p>
          </div>
          <div className="flex items-center">
            <FaCrown className="ml-[31px] mr-[5px] text-[#FDD24E]" />
            <span>재인</span>
          </div>
        </div>
      )}
    </div>
  );
}
export default Notify;
