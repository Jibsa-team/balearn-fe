import React from "react";

import EmptyLogo from "./emptyLogo";

function Empty({ message }: { message: string }) {
  return (
    <div className="bg-white w-full flex flex-col items-center justify-start p-[20px] rounded-2xl text-gray-700">
      <EmptyLogo width={60} height={60} />
      <span className="md:text-[1rem] text-[0.7rem] text-[rgba(0,0,0,0.6)] mt-[10px]">
        {message}
      </span>
    </div>
  );
}

export default Empty;
