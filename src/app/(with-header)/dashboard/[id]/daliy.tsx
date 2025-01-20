"use client";

import { useQuery } from "@tanstack/react-query";
import { DashboardType } from "@/types/dashboard/dashboard";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import DailySkeleton from "@/components/skeleton/dailySkelton";
import { useParams } from "next/navigation";
import Image from "next/image";

const fetchDailyData = async (
  groupId: string | string[]
): Promise<DashboardType> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/team/${groupId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch daily details");
  }
  return response.json();
};

function Daily() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboardData", id],
    queryFn: () => fetchDailyData(id!),
    enabled: !!id,
  });

  if (isError) return <div>오류가 발생했습니다.</div>;

  console.log(data?.result.goal[0].color);

  return (
    <div className="mb-[80px] pl-[10px]">
      <h1 className="flex items-center text-[1.4rem] font-semibold text-gray-700 mb-[20px]">
        <Image
          src={"/trophy.png"}
          alt="트로피"
          width={45}
          height={45}
          className="mr-[10px]"
        />
        <span>목표를 달성해보세요</span>
      </h1>
      {!isLoading ? (
        <div>
          <ol className="list-decimal pl-3">
            {data?.result.goal.map((e, i) => (
              <li key={i} className="flex items-center">
                <div
                  className="w-[20px] h-[20px] rounded-full mr-[10px]"
                  style={{ backgroundColor: e.color }}
                ></div>
                <span className="text-[1.1rem]">{e.detail}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <DailySkeleton />
      )}
    </div>
  );
}

export default Daily;
