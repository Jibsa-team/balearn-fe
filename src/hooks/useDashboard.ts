import { useQuery } from "@tanstack/react-query";
import { DashboardType } from "@/types/dashboard/dashboard";
import { getDashBoard } from "@/app/api/dashboard";

export function useDashboard(id: string) {
  const fetchNotifyData = async (): Promise<DashboardType> => {
    const response = await getDashBoard(id);
    if (!response.ok) {
      throw new Error("공지를 불러오지 못했습니다.");
    }
    return response.json();
  };

  return useQuery({
    queryKey: ["dashboardData", id] as const,
    queryFn: fetchNotifyData,
  });
}
