// WeeklyStudy.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { DashboardType } from "@/types/dashboard/dashboard";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import WeeklyStudySkeleteon from "@/components/skeleton/weeklySkelton";
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
    <div className="pl-[10px]">
      <h1 className="text-[1.4rem] font-semibold text-gray-700">주간 일정</h1>
      {!isLoading ? (
        data?.result.weekly_schedule ? (
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
          <div className="mt-[15px]">
            <button className="px-[20px] py-[5px] text-white rounded-lg bg-logoColor mt-[10px] w-[200px]">
              <span className="text-white">일정 등록하러 가기</span>
            </button>
          </div>
        )
      ) : (
        <WeeklyStudySkeleteon />
      )}
    </div>
  );
}

export default WeeklyStudy;
