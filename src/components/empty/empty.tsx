import React from "react";
import { BiSolidNote } from "react-icons/bi";

function Empty({ message }: { message: string }) {
  return (
    <div className="bg-white w-full flex flex-col items-center justify-start p-[20px] rounded-2xl text-gray-700">
      <BiSolidNote className="text-3xl mb-[10px]" />
      <span>{message}</span>
    </div>
  );
}

export default Empty;
