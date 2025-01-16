// WeeklyStudy.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { DashboardType } from "@/types/dashboard/dashboard";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import WeeklyStudySkeleteon from "@/components/skelton/dashboard/weeklySkelton";
import { useParams } from "next/navigation";

const fetchWeeklyData = async (
  id: string | string[]
): Promise<DashboardType> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/team/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch weekly study details");
  }
  return response.json();
};

function WeeklyStudy() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["weeklyData"],
    queryFn: () => fetchWeeklyData(id),
  });

  if (isError) return <div>오류가 발생했습니다.</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-700">Weekly Study</h1>
      {!isLoading ? (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-xl">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">요일</th>
                <th className="border border-gray-300 px-4 py-2">주제</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.result.weekly_schedule?.map((schedule) => (
                  <tr key={schedule.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {schedule.address}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {schedule.topic}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <WeeklyStudySkeleteon />
      )}
    </div>
  );
}

export default WeeklyStudy;
