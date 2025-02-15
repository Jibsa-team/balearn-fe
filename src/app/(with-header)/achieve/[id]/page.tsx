"use client";

import React from "react";
import BoardRight from "./board.right";
import TobRank from "./topRank";
import Misson from "./misson";

function page() {
  return (
    <div className="w-full bg-white md:p-[50px] p-[30px] sm:flex md:flex-row flex-col sm:justify-between overflow-y-scroll">
      <div className="md:w-[40%] w-full flex flex-col">
        <TobRank />
        <Misson />
      </div>
      <BoardRight />
    </div>
  );
}

export default page;
