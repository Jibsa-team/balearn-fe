"use client";

import React, { useState } from "react";
import { SketchPicker } from "react-color";
import TextInput from "@/components/group/input/textInput";
import { IoIosArrowDown } from "react-icons/io";
import GroupAddError from "@/components/error/ErrorMessage";
import { IoMdClose } from "react-icons/io";

interface GoalItem {
  id?: number;
  detail: string;
  color: string;
  _tempId?: string;
}

interface GoalListProps {
  goals: GoalItem[];
  setGoals: React.Dispatch<React.SetStateAction<GoalItem[]>>;
  setDeleteId: React.Dispatch<React.SetStateAction<(number | undefined)[]>>;
  errors?: string;
}

function GoalList({ goals, setGoals, setDeleteId, errors }: GoalListProps) {
  const [activePickerIndex, setActivePickerIndex] = useState<
    number | string | null
  >(null);
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

  const handleGoalChange = (
    goalId: number | string | undefined,
    value: string
  ) => {
    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId || goal._tempId === goalId) {
        return { ...goal, detail: value };
      }
      return goal;
    });
    setGoals(updatedGoals);
  };

  const handleColorChange = (
    goalId: number | string | undefined,
    color: { hex: string }
  ) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId || goal._tempId === goalId
        ? { ...goal, color: color.hex }
        : goal
    );
    setGoals(updatedGoals);
  };

  const addGoalItem = () => {
    setGoals([
      ...goals,
      { detail: "", color: getRandomColor(), _tempId: `temp-${Date.now()}` },
    ]);
  };

  const removeGoalItem = (goalId: number | string | undefined) => {
    const removedGoal = goals.find(
      (goal) => goal.id === goalId || goal._tempId === goalId
    );
    if (removedGoal && removedGoal.id !== undefined) {
      setDeleteId((prev) => [...prev, removedGoal.id]);
    }

    const updatedGoals = goals.filter(
      (goal) => goal.id !== goalId && goal._tempId !== goalId
    );
    setGoals(updatedGoals);
    setActivePickerIndex(null);
  };

  const toggleColorPicker = (
    goalId: number | string | undefined,
    buttonRef: HTMLDivElement | null
  ) => {
    if (activePickerIndex === goalId) {
      setActivePickerIndex(null);
    } else {
      if (buttonRef) {
        const rect = buttonRef.getBoundingClientRect();
        const windowWidth = window.innerWidth;

        if (windowWidth <= 768) {
          setPickerPosition({
            top: rect.bottom + window.scrollY,
            left: Math.max(10, rect.left + window.scrollX - 200),
          });
        } else {
          setPickerPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
          });
        }
      }
      if (goalId !== undefined) {
        setActivePickerIndex(goalId);
      }
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

      {goals.map((goal) => (
        <div
          key={goal.id || goal._tempId}
          className="w-full flex items-center justify-between mt-[15px]"
        >
          <TextInput
            message={"모임 목표를 입력해주세요."}
            width={80}
            value={goal.detail}
            onChange={(e) =>
              handleGoalChange(goal.id || goal._tempId, e.target.value)
            }
          />

          <div className="mt-[10px] flex items-center gap-[15px] relative">
            <div
              onClick={(e) =>
                toggleColorPicker(goal.id || goal._tempId, e.currentTarget)
              }
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
              onClick={() => removeGoalItem(goal.id || goal._tempId)}
              className="cursor-pointer"
            />
          </div>

          {activePickerIndex === (goal.id || goal._tempId) && (
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
                onChange={(color) =>
                  handleColorChange(goal.id || goal._tempId, color)
                }
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
