// TimePicker.tsx
"use client";

import { calendarTime } from "@/utils/calendar";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

function TimePicker({
  onTimeChange, // Function passed to handle time change
}: {
  onTimeChange: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [timeOpen, setTimeOpen] = useState<boolean>(false);

  const goals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Sample times

  const handleSelectUser = (name: number) => {
    console.log(name);
    const time = calendarTime(name);
    setSelectedTime(time);
    onTimeChange(time);
    setTimeOpen(false);
  };

  return (
    <div>
      <div className="w-[100%] ">
        <div className="relative w-[100%] mt-2 text-[0.9rem]">
          <div
            className="cursor-pointer border-[1px] border-gray-300 p-[10px] mb-[5px] ml-[10px] rounded-md flex justify-between items-center"
            onClick={() => setTimeOpen((prev) => !prev)}
          >
            <div className="w-full flex items-center justify-between">
              <span>{selectedTime || "00:00"}</span>
            </div>
            <MdKeyboardArrowDown className="text-gray-400" />
          </div>

          {timeOpen && (
            <div className="absolute top-[100%] left-0 w-full bg-white border-[1px] border-gray-300 mt-1 rounded-md shadow-lg z-10">
              {goals.map((goal) => (
                <div
                  key={goal}
                  className="cursor-pointer p-[10px] hover:bg-[rgba(0,0,0,0.05)]"
                  onClick={() => handleSelectUser(goal)}
                >
                  <div className="flex items-center justify-between">
                    <span>{calendarTime(goal)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TimePicker;
