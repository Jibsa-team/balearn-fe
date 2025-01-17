"use client";

import React, { useRef } from "react";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { FaRegCalendarMinus } from "react-icons/fa";
import { DatePicker } from "./datePicker";

function SelectCalendar({
  onDateChange,
  selectDate,
}: {
  onDateChange: (date: Date | null) => void;
  selectDate: Date | null;
}) {
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleDateChange = (date: Date | null) => {
    onDateChange(date); // 선택된 날짜를 부모 컴포넌트로 전달
  };

  return (
    <div ref={calendarRef} className="relative">
      <DatePicker
        onChange={handleDateChange}
        value={selectDate}
        calendarIcon={<FaRegCalendarMinus className="text-logoColor" />}
        clearIcon={null}
        format="yyyy-MM-dd"
        className="w-[200px] border-[1px] h-[41px] border-gray-300 rounded-md text-[0.9rem]"
      />
    </div>
  );
}

export default SelectCalendar;
