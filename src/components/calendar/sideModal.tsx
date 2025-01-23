import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CalendarGoal from "./goal";
import CalendarDate from "./date";
import { Goal } from "@/types/dashboard/dashboard";
import { useToast } from "@/hooks/use-toast";
import CalendarMission from "./mission";
import { Mission } from "@/types/calendar/event";

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
    selectedGoal: Goal,
    startDate: Date,
    endDate: Date,
    startTime: number,
    endTime: number,
    color: string,
    missions: Mission[],
    deleteMissons: number[]
  ) => void;
}) {
  const [selectedGoal, setSelectedGoal] = useState<Goal>();
  const [startDate, setStartDate] = useState<Date | null>(selectDate);
  const [endDate, setEndDate] = useState<Date | null>(selectDate);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [color, setColor] = useState<string>("");
  const [missions, setMissions] = useState<Mission[]>([]);
  const [deleteMissions, setDeleteMissions] = useState<number[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setSelectedGoal(undefined);
      setStartDate(selectDate);
      setEndDate(selectDate);
      setStartTime(0);
      setEndTime(0);
      setColor("");
      setMissions([]);
      setDeleteMissions([]);
    }
  }, [isOpen, selectDate]);

  const handlerUpdateEvent = () => {
    if (selectedGoal == null) {
      toast({
        title: "일정 등록 실패",
        description: "목표를 먼저 설정해주세요",
        variant: "destructive",
      });

      return;
    }
    handleAddEvent(
      selectedGoal!,
      startDate!,
      endDate!,
      startTime,
      endTime,
      color,
      missions,
      deleteMissions
    );
  };

  return (
    isOpen && (
      <motion.div
        className={`bg-white shadow-lg rounded-lg p-4 w-[300px] z-20 absolute right-0 top-0 h-[100%]
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
            setColor={setColor}
          />
          <CalendarMission
            setMissions={setMissions}
            missions={missions}
            setDeleteMissions={setDeleteMissions}
          />

          <CalendarDate
            view={view}
            setStartDate={setStartDate}
            startDate={startDate}
            setStartTime={setStartTime}
            startTime={startTime}
            setEndDate={setEndDate}
            endDate={endDate}
            setEndTime={setEndTime}
            endTime={endTime}
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
