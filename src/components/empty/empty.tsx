import React from "react";

import EmptyLogo from "./EmptyLogo";

function Empty({ message }: { message: string }) {
  return (
    <div className="bg-white w-full flex flex-col items-center justify-start p-[20px] rounded-2xl text-gray-700">
      <EmptyLogo width={150} height={150} />
      <span className="md:text-[1.2rem] text-[0.9rem] font-semibold">
        {message}
      </span>
    </div>
  );
}

export default Empty;
