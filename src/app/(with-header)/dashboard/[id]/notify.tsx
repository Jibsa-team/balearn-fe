"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AiFillNotification } from "react-icons/ai";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosArrowForward,
} from "react-icons/io";
import EmptyLogo from "@/components/empty/emptyLogo";
import NotifySkeleton from "@/components/skeleton/notifySkelton";
import { DashboardType } from "@/types/dashboard/dashboard";

interface NotifyProps {
  data: DashboardType | undefined;
  isLoading: boolean;
  isError: boolean;
}

function Notify({ data, isLoading, isError }: NotifyProps) {
  const { id } = useParams();
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) return <NotifySkeleton />;

  if (isError || !data?.result.notice) {
    return (
      <div
        onClick={() => router.push(`/setting/${id}/notify`)}
        className="mb-[30px] flex items-center justify-between sm:w-[400px] w-full sm:text-[1rem] text-[0.8rem] rounded-full px-[10px] border-[1px] cursor-pointer"
      >
        <div className="flex items-center">
          <EmptyLogo width={40} height={40} />
          <span className="md:text-[1rem] text-[0.8rem] ml-[5px] mt-[5px] text-gray-500">
            공지를 등록 해보세요
          </span>
        </div>
        <IoIosArrowForward className="mt-[5px] font-bold text-gray-500" />
      </div>
    );
  }

  return (
    <div>
      <div
        className={`mb-[40px] lg:w-[500px] sm:w-full sm:text-[0.9rem] text-[0.8rem] cursor-pointer`}
      >
        <div
          className={`bg-[#FAFAFA] p-[10px] rounded-md transition-all duration-300 ${
            isExpanded ? "shadow-lg" : ""
          }`}
        >
          <div
            className="flex items-center justify-between"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center">
              <AiFillNotification className="text-logoColor font-bold text-2xl mr-2" />
              <span className="text-gray-600">{data.result.notice.title}</span>
            </div>
            {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              isExpanded ? "h-auto mt-4 opacity-100" : "h-0 opacity-0"
            }`}
          >
            <div className="ml-[31px]">
              <p className="text-gray-600">{data.result.notice.detail}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notify;
