import Image from "next/image";
import React from "react";

function Member() {
  return (
    <div className="mt-[80px] mb-[20px]">
      <h1 className="text-2xl font-semibold text-gray-700">Study Member</h1>
      <div className="mt-[20px] flex">
        <div className="flex flex-col items-center mr-[20px]">
          <Image
            src="/Avatar.png"
            width={150}
            height={150}
            alt="study member"
            className="rounded-full"
          />
          <span className="mt-4 text-gray-700 font-medium text-center">
            재인(스터디장)
          </span>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/Avatar.png"
            width={150}
            height={150}
            alt="study member"
            className="rounded-full"
          />
          <span className="mt-4 text-gray-700 font-medium text-center">
            황민우(팀원)
          </span>
        </div>
      </div>
    </div>
  );
}

export default Member;
