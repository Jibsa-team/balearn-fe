// CanlendarSideModal.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CalendarGoal from "./goal";
import CalendarDate from "./date";

function CanlendarSideModal({
  isOpen,
  selectDate,
  view,
  handleAddEvent,
}: {
  isOpen: boolean;
  selectDate: Date;
  view: string;
  handleAddEvent: (
    selectedGoal: string,
    startDate: Date,
    endDate: Date,
    startTime: string,
    endTime: string
  ) => void;
}) {
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(selectDate);
  const [endDate, setEndDate] = useState<Date | null>(selectDate);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  useEffect(() => {
    setStartDate(selectDate);
    setEndDate(selectDate);
  }, [selectDate]);

  const handlerUpdateEvent = () => {
    handleAddEvent(selectedGoal, startDate!, endDate!, startTime, endTime);
  };

  return (
    isOpen && (
      <motion.div
        className={`bg-white shadow-lg rounded-lg p-4 w-[300px] z-40 absolute right-0 top-0 h-[100%]
          lg:w-[500px] lg:z-10 lg:static`}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div>
          <CalendarGoal
            setSelectedGoal={setSelectedGoal}
            selectedGoal={selectedGoal}
          />
          <CalendarDate
            view={view}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            startDate={startDate}
            endDate={endDate}
          />
          <button
            onClick={handlerUpdateEvent}
            className="w-full bg-logoColor text-white mt-[30px] py-[5px] rounded-lg"
          >
            추가하기
          </button>
        </div>
      </motion.div>
    )
  );
}

export default CanlendarSideModal;
