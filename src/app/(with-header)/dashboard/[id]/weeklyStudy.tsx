"use client";

// import WeeklyStudySkeleteon from "@/components/skeleton/weeklySkelton";
import { EventDto } from "@/types/calendar/event";
import { useParams, useRouter } from "next/navigation";
import React from "react";

interface WeeklyStudyProps {
  weeklyData?: EventDto[];
}

function WeeklyStudy({ weeklyData }: WeeklyStudyProps) {
  const { id } = useParams();
  const router = useRouter();

  const weekdays = [
    { day: "월요일", date: 1 },
    { day: "화요일", date: 2 },
    { day: "수요일", date: 3 },
    { day: "목요일", date: 4 },
    { day: "금요일", date: 5 },
    { day: "토요일", date: 6 },
    { day: "일요일", date: 0 },
  ];

  const getTopicForDay = (dayNumber: number) => {
    if (!weeklyData || !Array.isArray(weeklyData)) return "-";

    const schedules = weeklyData.filter((item) => {
      const date = new Date(item.startTime);
      return date.getDay() === dayNumber;
    });

    if (schedules.length === 0)
      return <span className="text-gray-400">{"-"}</span>;

    return (
      <ul className="flex flex-col gap-1 list-none">
        {schedules.map((schedule, index) => (
          <li key={index} className="flex items-center">
            <span
              style={{ backgroundColor: schedule.color }}
              className="inline-block w-1.5 h-1.5 rounded-full mr-2"
            ></span>
            {schedule.topic}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="pl-[10px]">
      <header className="w-full flex justify-between items-center">
        <span className="sm:text-[1.4rem] text-[1.1rem] font-semibold text-gray-700">
          주간
        </span>
        <button className="px-[5px] py-[5px] sm:text-[1rem] text-[0.8rem] text-white rounded-lg bg-logoColor sm:mt-[10px] mt-[0px] sm:w-[150px] w-[80px]">
          <span
            onClick={() => router.push(`/calendars/${id}`)}
            className="text-white"
          >
            일정 등록
          </span>
        </button>
      </header>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-xl">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 sm:text-[1.1rem] text-[1rem] sm:w-[20%]">
                요일
              </th>
              <th className="border border-gray-300 px-4 py-2 sm:text-[1.1rem] text-[1rem]">
                주제
              </th>
            </tr>
          </thead>
          <tbody>
            {weekdays.map(({ day, date }) => (
              <tr key={day}>
                <td className="border border-gray-300 px-4 py-2 sm:text-[1rem] text-[0.9rem] text-center">
                  {day}
                </td>
                <td className="border border-gray-300 px-4 py-2 sm:text-[1rem] text-[0.9rem] text-center">
                  {getTopicForDay(date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default React.memo(WeeklyStudy);
