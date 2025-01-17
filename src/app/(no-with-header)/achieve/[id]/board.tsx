import React from "react";
import { FaCheck } from "react-icons/fa";
import BoardUser from "./board.user";

function Board() {
  return (
    <div className="w-full bg-white p-[30px] px-[40px] rounded-xl shadow-lg mb-[50px]">
      <div className="flex justify-between mb-[40px]">
        <div className="flex flex-col justify-start w-[50%] mb-[10px]">
          <h2 className="text-[1.3rem] font-semibold">스터디 목적 💡</h2>
          <span className="text-[1rem]">취업 스터디</span>
        </div>
        <div className="flex flex-col justify-start w-[50%]">
          <h2 className="text-[1.3rem] font-semibold mb-[10px]">월요일 목표</h2>
          <div className="flex items-center mb-[10px]">
            <FaCheck className="mr-[10px] text-logoColor" />
            <span className="text-[1.2rem]">알고리즘 문제 2개 풀기</span>
          </div>
          <div className="flex items-center mb-[10px]">
            <FaCheck className="mr-[10px] text-logoColor" />
            <span className="text-[1.2rem]">취업 지원 1개씩 하기</span>
          </div>
          <div className="flex items-center mb-[10px]">
            <FaCheck className="mr-[10px] text-logoColor" />
            <span className="text-[1.2rem]">알고리즘 문제 2개 풀기</span>
          </div>
        </div>
      </div>
      <BoardUser />
    </div>
  );
}

export default Board;
