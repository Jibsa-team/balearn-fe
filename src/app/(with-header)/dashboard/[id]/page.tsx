"use client";

import { useNotify } from "@/hooks/useDashboard";
import Daliy from "./daliy";
import Member from "./member";
import Notify from "./notify";
import WeeklyStudy from "./weeklyStudy";
import { useParams } from "next/navigation";
import { useWeeklyStudy } from "@/hooks/useWeeklyStudy";

export default function Home() {
  const { id } = useParams();
  const { data, isLoading, isError } = useNotify(id as string);
  const { data: weeklyData } = useWeeklyStudy(id as string);

  return (
    <div className="w-full p-[30px] bg-white shadow-md overflow-y-scroll">
      <Notify data={data} isLoading={isLoading} isError={isError} />
      <Daliy data={data} isLoading={isLoading} isError={isError} />
      <Member data={data} isLoading={isLoading} isError={isError} />
      <WeeklyStudy weeklyData={weeklyData} />
    </div>
  );
}
