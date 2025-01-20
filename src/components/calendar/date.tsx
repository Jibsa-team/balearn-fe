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
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
  startDate: Date | null;
  endDate: Date | null;
  startTime: string;
  endTime: string;
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
          {view === "week" ? (
            <div className="flex items-center">
              <DatePicker date={startDate} setDate={setStartDate} />
              <TimePicker setTime={setStartTime} time={startTime} />
            </div>
          ) : (
            <DatePicker date={startDate} setDate={setStartDate} />
          )}
        </div>

        <div className="mb-[10px] flex items-center justify-between">
          <div className="mr-[10px] text-[1rem] font-semibold w-[40px]">
            종료
          </div>
          <SelectCalendar onDateChange={setEndDate} selectDate={endDate} />
          {view === "week" ? (
            <div className="flex items-center">
              <DatePicker date={endDate} setDate={setEndDate} />
              <TimePicker setTime={setEndTime} time={endTime} />
            </div>
          ) : (
            <DatePicker date={endDate} setDate={setEndDate} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarDate;
