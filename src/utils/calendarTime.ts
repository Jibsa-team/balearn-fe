export const calendarTime = (time: number) => {
  if (time >= 0 && time < 12) {
    return `오전 ${time}시`;
  } else if (time === 12) {
    return `오후 ${time}시`;
  } else {
    return `오후 ${time - 12}시`;
  }
};
