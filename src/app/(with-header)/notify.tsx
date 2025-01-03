"use client";

import { useState } from "react";
import { AiOutlineNotification } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaCrown } from "react-icons/fa";

function Notify() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDetails = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <div
      className={`mb-2 w-[500px] p-2 cursor-pointer transition-all duration-200 bg-notifyColor`}
    >
      <div
        className="flex items-center justify-between"
        onClick={toggleDetails}
      >
        <div className="flex items-center">
          <AiOutlineNotification className="text-logoColor font-bold text-2xl mr-2" />
          <span>드디어 취업 스터디 모임이 오픈되었습니다!!</span>
        </div>
        {isExpanded ? (
          <IoIosArrowUp className="text-gray-400" />
        ) : (
          <IoIosArrowDown className="text-gray-400" />
        )}
      </div>
      <div className="flex items-center text-gray-500">
        <FaCrown className="ml-[31px] mr-[5px]" />
        <span>재인</span>
      </div>
      {isExpanded && (
        <div className="mt-2 ml-[31px] ml-text-gray-600">
          <p>
            스터디 모임에서는 취업과 관련된 다양한 주제를 다룰 예정입니다. 함께
            목표를 설정하고 이를 달성하기 위해 노력합시다!
          </p>
        </div>
      )}
    </div>
  );
}

export default Notify;
