import React from "react";
import { DatePicker } from "./datePicker";
import { TimePicker } from "./timePicker";

function CalendarDate({
  setStartDate,
  setEndDate,
  startDate,
  endDate,
  setStartTime,
  setEndTime,
  startTime,
  endTime,
}: {
  view: string;
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setStartTime: React.Dispatch<React.SetStateAction<number>>;
  setEndTime: React.Dispatch<React.SetStateAction<number>>;
  startDate: Date | undefined;
  endDate: Date | undefined;
  startTime: number;
  endTime: number;
}) {
  return (
    <div>
      <div className="w-full">
        <div className="mb-[10px]">날짜 선택</div>
        <div className="mb-[10px] flex sm:flex-row flex-col sm:items-center items-start justify-between">
          <div className="mr-[10px] md:text-[0.9rem] text-[0.8rem] font-semibold w-[40px]">
            시작
          </div>
          <div className="flex sm:items-center sm:justify-normal justify-between sm:w-[85%] w-full">
            <DatePicker date={startDate} setDate={setStartDate} />
            <TimePicker setTime={setStartTime} time={startTime} />
          </div>
        </div>

        <div className="mb-[10px] flex sm:flex-row flex-col sm:items-center items-start justify-between">
          <div className="mr-[10px] md:text-[0.9rem] text-[0.8rem] font-semibold w-[40px]">
            종료
          </div>
          <div className="flex sm:items-center sm:justify-normal justify-between sm:w-[85%] w-full">
            <DatePicker date={endDate} setDate={setEndDate} />
            <TimePicker setTime={setEndTime} time={endTime} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarDate;
