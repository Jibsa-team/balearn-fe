import React from "react";

import EmptyLogo from "./EmptyLogo";

function Empty({ message }: { message: string }) {
  return (
    <div className="bg-white w-full flex flex-col items-center justify-start p-[20px] rounded-2xl text-gray-700">
      <EmptyLogo width={100} height={100} />
      <span className="md:text-[1.2rem] text-[0.9rem] font-semibold">
        {message}
      </span>
    </div>
  );
}

export default Empty;
