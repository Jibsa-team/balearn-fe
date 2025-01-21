export const calendarTime = (time: number) => {
  if (time >= 0 && time < 12) {
    return `${time}시`;
  } else if (time === 12) {
    return `${time}시`;
  } else {
    return `${time - 12}시`;
  }
};

export const calendarDay = (date: Date) => {
  const dayNames = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const dayName = dayNames[date.getDay()];
  return dayName;
};
