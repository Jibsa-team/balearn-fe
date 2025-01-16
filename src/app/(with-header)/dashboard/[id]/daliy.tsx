"use client";

import { useQuery } from "@tanstack/react-query";
import { DashboardType } from "@/types/dashboard/dashboard";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import DailySkeleton from "@/components/skelton/dashboard/dailySkelton";
import { useParams, useSearchParams } from "next/navigation"; // useSearchParams import

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
    queryKey: ["dailyData", id],
    queryFn: () => fetchDailyData(id!),
    enabled: !!id,
  });

  if (isError) return <div>오류가 발생했습니다.</div>;

  return (
    <div className="mb-[80px]">
      <h1 className="text-2xl font-semibold text-gray-700 mb-[20px]">
        Daily Study
      </h1>
      {!isLoading ? (
        <div>
          <ol className="list-decimal pl-6">
            {data?.result.goal.map((e, i) => (
              <li key={i}>{e.detail}</li>
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
