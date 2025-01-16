"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineNotification } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaCrown } from "react-icons/fa";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { DashboardType } from "@/types/dashboard/dashboard";
import { useParams } from "next/navigation";

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

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["notifyData"],
    queryFn: () => fetchNotifyData(id),
    enabled: true,
  });

  const toggleDetails = () => {
    if (!isExpanded) {
      refetch();
    }
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`mb-[40px] lg:w-[500px] sm:w-full p-2 cursor-pointer transition-all duration-200 bg-notifyColor`}
    >
      <div
        className="flex items-center justify-between"
        onClick={toggleDetails}
      >
        <div className="flex items-center">
          <AiOutlineNotification className="text-logoColor font-bold text-2xl mr-2" />
          <span>{data && data.result?.notice?.title}</span>
        </div>
        {isExpanded ? (
          <IoIosArrowUp className="text-gray-400" />
        ) : (
          <IoIosArrowDown className="text-gray-400" />
        )}
      </div>
      {isExpanded && (
        <div>
          {isLoading && (
            <div className="mt-2 ml-[31px] text-gray-600 animate-pulse">
              <p>로딩 중...</p>
            </div>
          )}
          {isError && (
            <div className="mt-2 ml-[31px] text-red-500">
              <p>알림 데이터를 불러오는 데 실패했습니다.</p>
            </div>
          )}
          {data && (
            <>
              <div className="mt-2 ml-[31px] text-gray-600">
                <p>{data.result.notice?.detail}</p>
              </div>
              <div className="flex items-center text-gray-500">
                <FaCrown className="ml-[31px] mr-[5px]" />
                <span>재인</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Notify;
