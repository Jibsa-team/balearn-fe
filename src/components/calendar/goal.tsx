"use client";

import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { Goal } from "@/types/dashboard/dashboard";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

async function fetchGoals(id: string) {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/team/${id}/goal`
  );

  const result = await response.json();
  const goal: Goal[] = result.result;
  if (!response.ok) {
    throw new Error("Failed to fetch goals");
  }
  return goal;
}

function CalendarGoal({
  setSelectedGoal,
  selectedGoal,
  setColor,
}: {
  setSelectedGoal: React.Dispatch<React.SetStateAction<Goal | undefined>>;
  selectedGoal: Goal | undefined;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [goalOpen, setGoalOpen] = useState<boolean>(false);
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["teamGoals", id],
    queryFn: () => fetchGoals(id as string),
  });

  const handleSelectGoal = (goal: Goal) => {
    setSelectedGoal(goal);
    setGoalOpen(false);
    setColor(goal.color);
  };

  return (
    <div>
      <div className="w-[100%]">
        <div className="mb-[30px]">
          <span>목표 선택</span>
          <div className="relative w-[100%] mt-2">
            <div
              className="cursor-pointer border-[1px] border-gray-300 p-[10px] rounded-md flex justify-between items-center"
              onClick={() => setGoalOpen((prev) => !prev)}
            >
              <div className="w-full flex items-center justify-between text-[0.9rem]">
                <span>{selectedGoal ? selectedGoal.detail : "선택하세요"}</span>
              </div>
              <div
                className="w-[20px] h-[20px] rounded-full mr-[10px]"
                style={{ backgroundColor: selectedGoal?.color }}
              ></div>
              <MdKeyboardArrowDown className="text-gray-400" />
            </div>

            {goalOpen && (
              <div className="absolute top-[100%] left-0 w-full bg-white border-[1px] border-gray-300 mt-1 rounded-md shadow-lg z-10">
                {data &&
                  data.map((goal, i) => (
                    <div
                      key={i}
                      className="cursor-pointer p-[10px] hover:bg-[rgba(0,0,0,0.05)] text-[0.9rem]"
                      onClick={() => handleSelectGoal(goal)}
                    >
                      <div className="flex items-center justify-between">
                        <span>{goal.detail}</span>
                        <div
                          className="w-[20px] h-[20px] rounded-full"
                          style={{ backgroundColor: goal.color }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarGoal;
