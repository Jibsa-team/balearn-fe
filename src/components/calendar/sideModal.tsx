import React from "react";
import { motion } from "framer-motion";
import { calendarDay } from "@/utils/calendar";
import CalendarGoal from "./goal";

function CanlendarSideModal({
  isOpen,
  currentDate,
}: {
  isOpen: boolean;
  currentDate: Date;
}) {
  return (
    isOpen && (
      <motion.div
        className="w-[500px] bg-white shadow-lg rounded-lg p-4 md:z-40"
        initial={{ x: 300, opacity: 0 }} // 초기 위치와 불투명도 설정
        animate={{ x: 0, opacity: 1 }} // 열렸을 때의 애니메이션
        exit={{ x: 300, opacity: 0 }} // 닫힐 때 애니메이션
        transition={{ type: "spring", stiffness: 300, damping: 30 }} // 애니메이션 속도와 탄성 조정
      >
        <div>
          <div className="text-xl flex justify-center items-center">
            {calendarDay(currentDate)}
          </div>
          <h1 className="text-xl font-semibold">목표</h1>
          <CalendarGoal />
        </div>
      </motion.div>
    )
  );
}

export default CanlendarSideModal;
