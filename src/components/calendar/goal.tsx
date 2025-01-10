"use client";

import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

function CalendarGoal({
  setSelectedGoal,
  selectedGoal,
}: {
  setSelectedGoal: React.Dispatch<React.SetStateAction<string>>;
  selectedGoal: string;
}) {
  const [goalOpen, setGoalOpen] = useState<boolean>(false);

  const goals = ["알고리즘 2개 풀기", "지원 1개 하기", "사이드 프로젝트"];

  const handleSelectUser = (name: string) => {
    setSelectedGoal(name);
    setGoalOpen(false);
  };

  return (
    <div>
      <div className="w-[100%]">
        <h2 className="text-[1.1rem] font-semibold mb-[20px]">목표</h2>
        <div className="mb-[30px]">
          <span>목표 선택</span>

          <div className="relative w-[100%] mt-2">
            <div
              className="cursor-pointer border-[1px] border-gray-300 p-[10px] rounded-md flex justify-between items-center"
              onClick={() => setGoalOpen((prev) => !prev)}
            >
              <div className="w-full flex items-center justify-between">
                <span>{selectedGoal || "선택하세요"}</span>
                <div className="w-[20px] h-[20px] rounded-full bg-logoColor"></div>
              </div>
              <MdKeyboardArrowDown className="text-gray-400" />
            </div>

            {goalOpen && (
              <div className="absolute top-[100%] left-0 w-full bg-white border-[1px] border-gray-300 mt-1 rounded-md shadow-lg z-10">
                {goals.map((goal) => (
                  <div
                    key={goal}
                    className="cursor-pointer p-[10px] hover:bg-[rgba(0,0,0,0.05)]"
                    onClick={() => handleSelectUser(goal)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{goal}</span>
                      <div className="w-[20px] h-[20px] rounded-full bg-logoColor"></div>
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
