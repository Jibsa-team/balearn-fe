import { useQuery } from "@tanstack/react-query";
import { getWeeklyStudy } from "@/app/api/dashboard";
import { EventDto } from "@/types/calendar/event";

export function useWeeklyStudy(id: string) {
  const fetchWeeklyStudyData = async (): Promise<EventDto[]> => {
    const response = await getWeeklyStudy(id);
    if (!response.ok) {
      throw new Error("공지를 불러오지 못했습니다.");
    }

    const result = await response.json();
    return result.result;
  };

  return useQuery({
    queryKey: ["weeklyStudy", id] as const,
    queryFn: fetchWeeklyStudyData,
    refetchOnMount: true,
  });
}
