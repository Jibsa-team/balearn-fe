import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimePickerProps {
  setTime: React.Dispatch<React.SetStateAction<number>>;
  time: string;
}

export function TimePicker({ setTime }: TimePickerProps) {
  const times = Array.from({ length: 24 }).map((_, i) => {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const ampm = i < 12 ? "오전" : "오후";
    return `${ampm} ${hour}시`;
  });

  const handleTimeChange = (value: string) => {
    const selectedTime = times.indexOf(value);
    if (selectedTime !== -1) {
      console.log(selectedTime, value);
      setTime(selectedTime);
    }
  };

  return (
    <Select onValueChange={handleTimeChange}>
      <SelectTrigger className="w-[110px]">
        <SelectValue placeholder="시간 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {times.map((time, index) => (
            <SelectItem key={index} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
