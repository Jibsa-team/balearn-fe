"use client";

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function Mission() {
  const [missions, setMissions] = useState([
    { id: 1, text: "구현 문제 2개 풀기", completed: false },
    { id: 2, text: "원티드 지원 1개 하기", completed: false },
    { id: 3, text: "7시에 운동하기", completed: false },
  ]);

  const toggleMission = (id) => {
    setMissions(
      missions.map((mission) =>
        mission.id === id
          ? { ...mission, completed: !mission.completed }
          : mission
      )
    );
  };

  const handleSubmit = () => {
    console.log(
      "Submitted missions:",
      missions.filter((m) => m.completed)
    );
  };

  return (
    <div className="md:mt-[60px] mt-[15px] p-4">
      <h2 className="text-[1.2rem] md:text-2xl font-bold mb-4">
        오늘의 미션 달성해주세요
      </h2>
      <ul className="mb-4">
        {missions.map((mission) => (
          <li
            key={mission.id}
            className="flex items-center mb-2 cursor-pointer"
            onClick={() => toggleMission(mission.id)}
          >
            <FaStar
              className={`mr-2 text-[1.7rem] font-semibold ${
                mission.completed ? "text-logoColor" : "text-gray-300"
              }`}
            />
            <span className="text-[1.2rem] ml-2">{mission.text}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={handleSubmit}
        className="w-full flex justify-center items-center bg-logoColor text-white px-4 md:py-2 py-1 rounded text-lg mt-[10px]"
      >
        제출
      </button>
    </div>
  );
}

export default Mission;
