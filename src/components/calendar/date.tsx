import React from "react";
import SelectCalendar from "./select.calendar";
import { DatePicker } from "./datePicker";
import { TimePicker } from "./timePicker";

function CalendarDate({
  view,
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
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setStartTime: React.Dispatch<React.SetStateAction<number>>;
  setEndTime: React.Dispatch<React.SetStateAction<number>>;
  startDate: Date | null;
  endDate: Date | null;
  startTime: number;
  endTime: number;
}) {
  return (
    <div>
      <div className="w-[100%]">
        <h2 className="text-[1.1rem] font-semibold mb-[20px]">날짜</h2>

        <div className="mb-[10px] flex items-center justify-between">
          <div className="mr-[10px] text-[1rem] font-semibold w-[40px]">
            시작
          </div>
          <SelectCalendar onDateChange={setStartDate} selectDate={startDate} />
          <div className="flex items-center">
            <DatePicker date={startDate} setDate={setStartDate} />
            <TimePicker setTime={setStartTime} time={startTime} />
          </div>
        </div>

        <div className="mb-[10px] flex items-center justify-between">
          <div className="mr-[10px] text-[1rem] font-semibold w-[40px]">
            종료
          </div>
          <SelectCalendar onDateChange={setEndDate} selectDate={endDate} />
          <div className="flex items-center">
            <DatePicker date={endDate} setDate={setEndDate} />
            <TimePicker setTime={setEndTime} time={endTime} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarDate;
