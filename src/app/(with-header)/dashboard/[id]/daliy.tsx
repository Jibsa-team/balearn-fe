"use client";

import { DashboardType } from "@/types/dashboard/dashboard";
import DailySkeleton from "@/components/skeleton/dailySkelton";
import Image from "next/image";

interface DailyProps {
  data: DashboardType | undefined;
  isLoading: boolean;
  isError: boolean;
}

function Daily({ data, isLoading, isError }: DailyProps) {
  if (isError) return <div>오류가 발생했습니다.</div>;

  return (
    <div className="mb-[80px] pl-[10px]">
      <h1 className="flex items-center sm:text-[1.3rem] text-[1.1rem] font-semibold text-gray-700 mb-[20px]">
        <Image
          src={"/trophy.png"}
          alt="트로피"
          width={40}
          height={40}
          className="mr-[10px]"
        />
        <span>목표를 달성해보세요</span>
      </h1>
      {!isLoading ? (
        <div className="w-full flex flex-nowrap gap-4 md:flex-wrap md:overflow-x-visible hide-scrollbar overflow-x-auto whitespace-nowrap">
          {data?.result.goal.map((goal) => (
            <div
              key={goal.id}
              className=" px-[20px] py-[10px]"
              style={{
                boxShadow: `inset 0 -10px 0 ${goal.color}90`,
              }}
            >
              <p className="text-[1rem] text-gray-700">{goal.detail}</p>
            </div>
          ))}
        </div>
      ) : (
        <DailySkeleton />
      )}
    </div>
  );
}

export default Daily;
