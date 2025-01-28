"use client";

import React from "react";
import BoardRight from "./board.right";
import TobRank from "./topRank";
import Misson from "./misson";

function page() {
  return (
    <div className="md:w-[95%] w-full bg-white md:p-[50px] p-[30px] flex md:flex-row flex-col justify-between">
      <div className="md:w-[40%] w-full flex flex-col">
        <TobRank />
        <Misson />
      </div>
      <BoardRight />
    </div>
  );
}

export default page;
