import React from "react";
import RadialBarChart from "./chart.donut";
import RangeBarChart from "./chart.stick";

function BoardChart() {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="w-[35%] bg-white">
        <RadialBarChart />
      </div>
      <div className="w-[60%] bg-white">
        <RangeBarChart />
      </div>
    </div>
  );
}

export default BoardChart;
