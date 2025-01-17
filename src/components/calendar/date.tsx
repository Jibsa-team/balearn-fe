"use client";

import React, { useEffect, useState } from "react";
import SelectCalendar from "./select.calendar";
import { DatePicker } from "./datePicker";

function CalendarDate({
  view,
  setStartDate,
  setEndDate,
  setStartTime,
  setEndTime,
  startDate,
  endDate,
}: {
  view: string;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
  startDate: Date | null;
  endDate: Date | null;
}) {
  const [startTimeValue, setStartTimeValue] = useState<string>("");
  const [endTimeValue, setEndTimeValue] = useState<string>("");

  const convertTo24HourFormat = (timeString: string) => {
    const regex = /([오전|오후]+)\s*(\d{1,2})시/;
    const match = timeString.match(regex);

    if (match) {
      const period = match[1]; // "오전" 또는 "오후"
      let hour = parseInt(match[2], 10);

      if (period === "오후" && hour < 12) {
        hour += 12; // 오후 시간은 12를 더함
      } else if (period === "오전" && hour === 12) {
        hour = 0; // 오전 12시는 자정이므로 0으로 설정
      }

      return hour;
    }
    return null;
  };

  useEffect(() => {
    if (startTimeValue) {
      const startDateTime = new Date(startDate!);
      const startHour = convertTo24HourFormat(startTimeValue);

      if (startHour !== null) {
        startDateTime.setHours(startHour, 0);
        setStartDate(startDateTime);
      }
    }
  }, [startTimeValue]);

  useEffect(() => {
    if (endTimeValue) {
      const endDateTime = new Date(endDate!);
      const endHour = convertTo24HourFormat(endTimeValue);

      if (endHour !== null) {
        endDateTime.setHours(endHour, 0); // 분은 기본적으로 0으로 설정
        setEndDate(endDateTime);
      }
    }
  }, [endTimeValue]);

  return (
    <div>
      <div className="w-[100%]">
        <h2 className="text-[1.1rem] font-semibold mb-[20px]">날짜</h2>

        <div className="mb-[10px] flex items-center justify-between">
          <div className="mr-[10px] text-[1rem] font-semibold w-[40px]">
            시작
          </div>
          <SelectCalendar onDateChange={setStartDate} selectDate={startDate} />
          {view === "week" && (
            <DatePicker
              onTimeChange={(time) => {
                setStartTimeValue(time);
                setStartTime(time);
              }}
            />
          )}
        </div>

        <div className="mb-[10px] flex items-center justify-between">
          <div className="mr-[10px] text-[1rem] font-semibold w-[40px]">
            종료
          </div>
          <SelectCalendar onDateChange={setEndDate} selectDate={endDate} />
          {view === "week" && (
            <DatePicker
              onTimeChange={(time) => {
                setEndTimeValue(time);
                setEndTime(time);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarDate;
