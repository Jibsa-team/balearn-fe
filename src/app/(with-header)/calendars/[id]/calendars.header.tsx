import moment from "moment";
import React from "react";
import { View } from "react-big-calendar";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface CalendarsHeaderProps {
  view: View;
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  setView: React.Dispatch<React.SetStateAction<View>>;
  fetchEvents: (date: Date, view: View) => Promise<void>;
}

function CalendarsHeader({
  view,
  currentDate,
  setCurrentDate,
  setView,
  fetchEvents,
}: CalendarsHeaderProps) {
  const navigateToPrevious = () => {
    const newDate =
      view === "week"
        ? moment(currentDate).subtract(1, "week").toDate()
        : moment(currentDate).subtract(1, "month").toDate();
    setCurrentDate(newDate);
    fetchEvents(newDate, view);
  };

  const navigateToNext = () => {
    const newDate =
      view === "week"
        ? moment(currentDate).add(1, "week").toDate()
        : moment(currentDate).add(1, "month").toDate();
    setCurrentDate(newDate);
    fetchEvents(newDate, view);
  };

  return (
    <div className="flex justify-between mb-4 items-center p-[10px]">
      <div></div>
      <div className="flex items-center">
        <button
          className="w-[20px] h-[20px] flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
          onClick={navigateToPrevious}
        >
          <IoIosArrowBack />
        </button>

        <div className="text-lg font-bold mx-[10px]">
          {`${moment(currentDate)
            .startOf("week")
            .format("YYYY.MM.D")} ~ ${moment(currentDate)
            .endOf("week")
            .format("D")}`}
        </div>

        <button
          className="w-[20px] h-[20px] flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
          onClick={navigateToNext}
        >
          <IoIosArrowForward />
        </button>
      </div>

      <div className="flex justify-center">
        <button
          className={`border border-gray-300 rounded-lg px-[16px] py-[4px] mr-2 ${
            view === "week" ? "text-blue-500" : ""
          }`}
          onClick={() => setView("week")}
        >
          주간
        </button>
        <button
          className={`border border-gray-300 rounded-lg px-[16px] py-[4px] ${
            view === "month" ? "text-blue-500" : ""
          }`}
          onClick={() => setView("month")}
        >
          월간
        </button>
      </div>
    </div>
  );
}

export default CalendarsHeader;
