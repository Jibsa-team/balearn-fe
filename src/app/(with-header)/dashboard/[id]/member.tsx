// Member.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { DashboardType } from "@/types/dashboard/dashboard";
import MemberSkeleton from "@/components/skeleton/memberSkelton";
import { useParams } from "next/navigation";

const fetchMemberData = async (
  groupId: string | string[]
): Promise<DashboardType> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/team/${groupId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch member details");
  }
  return response.json();
};

function Member() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: () => fetchMemberData(id),
  });

  if (isError) return <div>오류가 발생했습니다.</div>;

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "OWNER":
        return "(스터디장)";
      case "MEMBER":
        return "(팀원)";
      case "ADMIN":
        return "(관리자)";
      default:
        return "(알 수 없음)";
    }
  };

  return (
    <div className="mb-[80px] pl-[10px]">
      <h1 className="text-[1.4rem] font-semibold text-gray-700">스터디 멤버</h1>
      <div className="mt-[20px] flex overflow-x-scroll whitespace-nowrap hide-scrollbar">
        {!isLoading ? (
          data &&
          data.result.teamUser?.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center mr-[10px]"
            >
              {member.imgUrl ? (
                <div className="rounded-full p-[5px] border-[2.5px] w-[120px] h-[120px] overflow-hidden relative">
                  <Image
                    src={member.imgUrl}
                    alt={`${member.nickname} img`}
                    layout="fill"
                    className="rounded-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-[30px] h-[30px] bg-gray-300 rounded-full" />
              )}
              <span className="mt-4 text-gray-700 font-medium text-center">
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
