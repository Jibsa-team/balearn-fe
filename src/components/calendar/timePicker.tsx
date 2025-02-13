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
  time: number;
}

export function TimePicker({ setTime, time }: TimePickerProps) {
  console.log(time);
  const formatTimeString = (hour: number) => {
    const ampm = hour < 12 ? "오전" : "오후";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${ampm} ${displayHour}시`;
  };

  const times = Array.from({ length: 24 }).map((_, i) => formatTimeString(i));
  const currentTimeString = formatTimeString(time);

  const handleTimeChange = (value: string) => {
    const selectedTime = times.indexOf(value);
    if (selectedTime !== -1) {
      setTime(selectedTime);
    }
  };

  return (
    <Select value={currentTimeString} onValueChange={handleTimeChange}>
      <SelectTrigger className="sm:w-[120px] w-[100px]">
        <SelectValue placeholder="시간 선택" className="text-[0.7rem]">
          {currentTimeString}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {times.map((timeString, index) => (
            <SelectItem key={index} value={timeString}>
              <span className="sm:text-[0.8rem]">{timeString}</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
