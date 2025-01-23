"use client";

import { Mission } from "@/types/calendar/event";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";

interface CalendarMissionProps {
  missions: Mission[];
  setMissions: React.Dispatch<React.SetStateAction<Mission[]>>;
  setDeleteMissions: React.Dispatch<React.SetStateAction<number[]>>;
}

function CalendarMission({
  setMissions,
  missions,
  setDeleteMissions,
}: CalendarMissionProps) {
  const addMission = () => {
    setMissions((prev) => [
      ...prev,
      {
        detail: "",
        tempId: `new_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      },
    ]);
  };

  const removeMission = (mission: Mission) => {
    if (missions.length > 1) {
      if (mission.id && mission.id > 0) {
        setDeleteMissions((prev) => {
          if (mission.id) {
            return [...prev, mission.id];
          }
          return prev;
        });
      }

      setMissions((prev) =>
        prev.filter((m) =>
          mission.id ? m.id !== mission.id : m.tempId !== mission.tempId
        )
      );
    }
  };

  const updateMission = (mission: Mission, detail: string) => {
    setMissions((prev) =>
      prev.map((m) => {
        // id 또는 tempId로 미션 찾아 업데이트
        if (
          (mission.id && m.id === mission.id) ||
          (mission.tempId && m.tempId === mission.tempId)
        ) {
          return { ...m, detail };
        }
        return m;
      })
    );
  };

  return (
    <div className="w-full mb-[40px]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[1.1rem] font-semibold">모임 미션</span>
        <button
          onClick={addMission}
          className="flex items-center text-sm text-gray-600 hover:text-gray-800"
        >
          <IoMdAdd className="mr-1" size={16} />
          미션 추가
        </button>
      </div>

      <div className="space-y-3">
        {missions.map((mission) => (
          <div
            key={mission.id || mission.tempId}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={mission.detail}
              onChange={(e) => updateMission(mission, e.target.value)}
              placeholder="미션을 입력해주세요"
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {missions.length > 1 && (
              <button
                onClick={() => removeMission(mission)}
                className="p-2 text-gray-400 hover:text-black"
              >
                <IoClose size={20} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarMission;
