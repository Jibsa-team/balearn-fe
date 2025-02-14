import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CalendarGoal from "./goal";
import CalendarDate from "./date";
import { Goal } from "@/types/dashboard/dashboard";
import { useToast } from "@/hooks/use-toast";
import CalendarMission from "./mission";
import { Mission } from "@/types/calendar/event";
import { IoMdClose } from "react-icons/io";

function CanlendarSideModal({
  isOpen,
  setIsOpen,
  selectDate,
  view,
  handleAddEvent,
  isLoading,
  selectedStartTime,
  selectedEndTime,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectDate: Date;
  view: string;
  isLoading: boolean;
  selectedStartTime: number;
  selectedEndTime: number;
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
  const [startDate, setStartDate] = useState<Date | undefined>(selectDate);
  const [endDate, setEndDate] = useState<Date | undefined>(selectDate);
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
      setStartTime(selectedStartTime);
      setEndTime(selectedEndTime);
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
        className={`bg-white shadow-lg rounded-lg p-4 w-[85%] z-20 fixed right-0 bottom-0
        sm:w-[400px] lg:z-10`}
        style={{
          height: "calc(100vh - 70px)",
        }}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div>
          <div className="flex items-start justify-between mb-[30px]">
            <span className="text-[1.3rem]">일정 추가</span>
            <IoMdClose
              className="mt-[5px] text-[1.2rem] cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
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
            disabled={isLoading}
          >
            {isLoading ? "추가중.." : "추가하기"}
          </button>
        </div>
      </motion.div>
    )
  );
}

export default CanlendarSideModal;
