import Image from "next/image";
import React from "react";
import { IoIosSend } from "react-icons/io";

const Chat = [
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
];

function page() {
  return (
    <div className="w-full bg-white h-screen overflow-y-scroll">
      <div className="p-[20px] h-full">
        {Chat.map((e, i) => {
          return (
            <div className="flex items-center mb-[20px]" key={i}>
              <Image
                src={"/Avatar.png"}
                alt={"유저 이미지"}
                width={37}
                height={37}
                className="rounded-full mr-[10px]"
              />
              <span className="bg-logoColor text-white px-[20px] py-[5px] rounded-full">
                {e}
              </span>
            </div>
          );
        })}
      </div>
      {/* 채팅 입력 칸 */}
      <div className="w-full h-[70px] sticky bottom-0 bg-gray-200 flex items-center px-[20px]">
        <input
          type="text"
          placeholder="text..."
          className="flex-1 px-[20px] py-[10px] rounded-full outline-none"
        />
        <div className="p-[10px] rounded-full bg-logoColor ml-[10px] text-white">
          <IoIosSend className="text-2xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default page;
