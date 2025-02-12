// Member.tsx
"use client";

import Image from "next/image";
import { DashboardType } from "@/types/dashboard/dashboard";
import MemberSkeleton from "@/components/skeleton/memberSkelton";

interface MemberProps {
  data: DashboardType | undefined;
  isLoading: boolean;
  isError: boolean;
}

function Member({ data, isLoading, isError }: MemberProps) {
  if (isError) return <div>오류가 발생했습니다.</div>;

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "OWNER":
        return "(스터디장)";
      case "LEADER":
        return "(관리자)";
      case "MEMBER":
        return "(팀원)";
    }
  };

  return (
    <div className="mb-[80px] pl-[10px]">
      <h1 className="sm:text-[1.4rem] text-[1.1rem] font-semibold text-gray-700">
        스터디 멤버
      </h1>
      <div className="mt-[20px] flex overflow-x-scroll whitespace-nowrap hide-scrollbar">
        {!isLoading ? (
          data &&
          data.result.teamUser?.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center mr-[10px]"
            >
              {member.imgUrl ? (
                <div className="rounded-full p-[5px] border-[2.5px] sm:w-[110px] w-[90px] sm:h-[110px] h-[90px] overflow-hidden relative">
                  <Image
                    src={member.imgUrl}
                    alt={`${member.nickname} img`}
                    layout="fill"
                    className="rounded-full object-cover"
                    priority={true}
                  />
                </div>
              ) : (
                <div className="w-[30px] h-[30px] bg-gray-300 rounded-full" />
              )}
              <span className="mt-4 text-gray-700 font-medium text-center sm:[text-1rem] text-[0.8rem]">
                {member.nickname}
                {getRoleLabel(member.role)}
              </span>
            </div>
          ))
        ) : (
          <>
            <MemberSkeleton />
            <MemberSkeleton />
            <MemberSkeleton />
          </>
        )}
      </div>
    </div>
  );
}

export default Member;
