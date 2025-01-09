import React from "react";
import Board from "./board";
import BoardChart from "./board.chart";

function page() {
  return (
    <div className="w-[95%] pt-[100px]">
      <Board />
      <BoardChart />
    </div>
  );
}

export default page;
