"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Next.js와 ApexCharts 호환을 위해 동적 로딩
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function RangeBarChart() {
  // 팀원 데이터
  const teamData = [
    { name: "Alice", scores: [2800, 4500] },
    { name: "Bob", scores: [3200, 4100] },
    { name: "Charlie", scores: [2950, 7800] },
    { name: "Diana", scores: [3000, 4600] },
    { name: "Eve", scores: [3500, 4100] },
    { name: "Frank", scores: [4500, 6500] },
    { name: "Grace", scores: [4100, 5600] },
  ];

  // ApexCharts 옵션 정의
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "rangeBar",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        isDumbbell: true,
        columnWidth: "30%", // 너비 조정
        dumbbellColors: [["#008FFB", "#00E396"]],
      },
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      position: "top",
      horizontalAlign: "left",
      customLegendItems: ["Score Range"],
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        gradientToColors: ["#00E396"],
        inverseColors: true,
        stops: [0, 100],
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: true, // x축 보조선 활성화
        },
      },
      yaxis: {
        lines: {
          show: false, // y축 보조선 비활성화
        },
      },
    },
    xaxis: {
      categories: teamData.map((team) => team.name), // 가로축에 팀원 이름 추가
      tickPlacement: "on",
    },
  };

  // 데이터 시리즈 정의
  const series = [
    {
      name: "Team Scores",
      data: teamData.map((team) => ({
        x: team.name,
        y: team.scores,
      })),
    },
  ];

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="rangeBar"
        height={350}
      />
    </div>
  );
}

export default RangeBarChart;
