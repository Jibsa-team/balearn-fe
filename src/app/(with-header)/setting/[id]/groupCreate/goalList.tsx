"use client";

import React, { useState } from "react";
import { SketchPicker } from "react-color";
import TextInput from "@/components/group/input/textInput";
import { IoIosArrowDown } from "react-icons/io";
import GroupAddError from "@/components/error/ErrorMessage";
import { IoMdClose } from "react-icons/io";

interface GoalItem {
  detail: string;
  color: string;
}

interface GoalListProps {
  goals: GoalItem[];
  setGoals: React.Dispatch<React.SetStateAction<GoalItem[]>>;
  errors?: string;
}

function GoalList({ goals, setGoals, errors }: GoalListProps) {
  const [activePickerIndex, setActivePickerIndex] = useState<number | null>(
    null
  );
  const [pickerPosition, setPickerPosition] = useState<{
    top: number;
    left: number;
  }>({
    top: 0,
    left: 0,
  });

  const getRandomColor = () => {
    const colors = [
      "#2C3E50",
      "#8E44AD",
      "#2980B9",
      "#cfba21",
      "#D35400",
      "#C0392B",
      "#16A085",
      "#2874A6",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleGoalChange = (index: number, value: string) => {
    const updatedGoals = [...goals];
    updatedGoals[index].detail = value;
    setGoals(updatedGoals);
  };

  const handleColorChange = (index: number, color: { hex: string }) => {
    const updatedGoals = [...goals];
    updatedGoals[index].color = color.hex;
    setGoals(updatedGoals);
  };

  const addGoalItem = () => {
    setGoals([...goals, { detail: "", color: getRandomColor() }]);
  };

  const removeGoalItem = (index: number) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
    setActivePickerIndex(null);
  };

  const toggleColorPicker = (
    index: number,
    buttonRef: HTMLDivElement | null
  ) => {
    if (activePickerIndex === index) {
      setActivePickerIndex(null);
    } else {
      if (buttonRef) {
        const rect = buttonRef.getBoundingClientRect();
        setPickerPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
        });
      }
      setActivePickerIndex(index);
    }
  };

  return (
    <div className="w-full flex flex-col items-start mb-[20px] font-semibold">
      <div className="w-full flex justify-between items-center">
        <span>모임 목표</span>
        <div
          onClick={addGoalItem}
          className="flex items-center border-[1px] bg-logoColor text-white px-[20px] py-[6px] rounded-md cursor-pointer"
        >
          <div className="text-[0.7rem]">Add</div>
        </div>
      </div>

      {goals.map((goal, index) => (
        <div
          key={index}
          className="w-full flex items-center justify-between mt-[15px]"
        >
          <TextInput
            message={"모임 목표를 입력해주세요."}
            width={80}
            value={goal.detail}
            onChange={(e) => handleGoalChange(index, e.target.value)}
          />

          <div className="mt-[10px] flex items-center gap-[15px] relative">
            <div
              onClick={(e) => toggleColorPicker(index, e.currentTarget)}
              className="w-[60px] h-[30px] rounded-full cursor-pointer flex items-center justify-center"
              style={{
                border: "1px solid rgba(0,0,0,0.2)",
                padding: "5px",
              }}
            >
              <div
                className="w-[20px] h-[20px] rounded-full"
                style={{
                  backgroundColor: goal.color,
                }}
              />
              <IoIosArrowDown className="ml-[5px] text-gray-500" />
            </div>
            <IoMdClose
              onClick={() => removeGoalItem(index)}
              className="cursor-pointer"
            />
          </div>

          {activePickerIndex === index && (
            <div
              style={{
                position: "absolute",
                top: pickerPosition.top,
                left: pickerPosition.left,
                zIndex: 10,
              }}
            >
              <SketchPicker
                color={goal.color}
                onChange={(color) => handleColorChange(index, color)}
              />
            </div>
          )}
        </div>
      ))}
      {errors && <GroupAddError errors={errors} />}
    </div>
  );
}

export default GoalList;
