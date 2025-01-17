import Image from "next/image";
import React from "react";

function BoardUser() {
  return (
    <div>
      <h2 className="text-[1.3rem] font-semibold mb-[50px]">
        팀원 점수를 확인해보세요
      </h2>
      <div className="flex justify-start">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center mr-[100px]">
            <Image
              src={"/Avatar.png"}
              alt="user image"
              width={100}
              height={100}
              className="rounded-full"
            />
            <span>황민우</span>
            <span>140점</span>
          </div>
          <div className="h-[100px] border-l-[1px] border-[rgba(0,0,0,0.2)] mb-[20px] mr-[100px]"></div>{" "}
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center mr-[100px]">
            <Image
              src={"/Avatar.png"}
              alt="user image"
              width={100}
              height={100}
              className="rounded-full"
            />
            <span>황민우</span>
            <span>140점</span>
          </div>
          <div className="h-[100px] border-l-[1px] border-[rgba(0,0,0,0.2)] mb-[20px] mr-[100px]"></div>{" "}
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center mr-[100px]">
            <Image
              src={"/Avatar.png"}
              alt="user image"
              width={100}
              height={100}
              className="rounded-full"
            />
            <span>황민우</span>
            <span>140점</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardUser;
