import Image from "next/image";
import React from "react";
import { IoMdSend } from "react-icons/io";

const Chat = [
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",

  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
  "안녕하세요",
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
    <div className="w-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="p-[20px]">
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
      </div>

      <div className="w-full h-[70px] bg-gray-200 flex items-center px-[20px] relative">
        <input
          type="text"
          placeholder="text..."
          className="flex-1 px-[20px] py-[10px] rounded-full outline-none"
        />
        <IoMdSend className="text-2xl cursor-pointer absolute right-[100px] text-gray-400" />
      </div>
    </div>
  );
}

export default page;
