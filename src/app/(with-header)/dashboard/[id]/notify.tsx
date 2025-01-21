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
import { ClipLoader } from "react-spinners";
import EmptyLogo from "@/components/empty/EmptyLogo";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dashboardData", id],
    queryFn: () => fetchNotifyData(id),
    enabled: true,
  });

  const toggleDetails = () => {
    if (!isExpanded) {
      refetch();
    }
    setIsExpanded((prev) => !prev);
  };

  console.log(data);

  return data?.result.notice ? (
    <div
      className={`mb-[40px] lg:w-[500px] sm:w-full cursor-pointer transition-all duration-200 border-[2px] border-logoColor p-[10px] rounded-md`}
    >
      <div
        className="flex items-center justify-between"
        onClick={toggleDetails}
      >
        <div className="flex items-center">
          <AiFillNotification className="text-logoColor font-bold text-2xl mr-2" />
          <span>{data && data.result?.notice?.title}</span>
        </div>
        {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      {isExpanded && (
        <div>
          {isLoading && (
            <div className="mt-2 ml-[31px] text-gray-600 animate-pulse">
              <ClipLoader />
            </div>
          )}
          {isError && (
            <div className="mt-2 ml-[31px] text-red-500">
              <p>알림 데이터를 불러오는 데 실패했습니다.</p>
            </div>
          )}
          {data && (
            <>
              <div className="mt-2 ml-[31px]">
                <p>{data.result.notice?.detail}</p>
              </div>
              <div className="flex items-center">
                <FaCrown className="ml-[31px] mr-[5px] text-[#FDD24E]" />
                <span>재인</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  ) : (
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

export default Notify;
