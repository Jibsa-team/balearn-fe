"use client";

import React, { useState } from "react";
import { Calendar, momentLocalizer, SlotInfo, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { calendarTime } from "@/utils/calendar";
import CanlendarSideModal from "@/components/calendar/sideModal";

const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
}

const daysInKorean = {
  Sun: "일",
  Mon: "월",
  Tue: "화",
  Wed: "수",
  Thu: "목",
  Fri: "금",
  Sat: "토",
};

const Page: React.FC = () => {
  const [view, setView] = useState<View>("week");
  const [events, setEvents] = useState<Event[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    // const title = prompt("Enter event title:");
    // if (title) {
    //   const startTime = moment(slotInfo.start)
    //     .set({ hour: 8, minute: 0, second: 0 })
    //     .toDate();
    //   const endTime = moment(startTime).add(3, "hour").toDate();

    //   setEvents([
    //     ...events,
    //     {
    //       start: startTime,
    //       end: endTime,
    //       title,
    //     },
    //   ]);
    // }
    console.log(slotInfo);
    setIsOpen((prev) => !prev);
  };

  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

  const navigateToPrevious = () => {
    const newDate =
      view === "week"
        ? moment(currentDate).subtract(1, "week").toDate()
        : moment(currentDate).subtract(1, "month").toDate();
    setCurrentDate(newDate);
  };

  const navigateToNext = () => {
    const newDate =
      view === "week"
        ? moment(currentDate).add(1, "week").toDate()
        : moment(currentDate).add(1, "month").toDate();
    setCurrentDate(newDate);
  };

  return (
    <div className="w-full bg-white flex">
      <div className="w-full">
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
              {moment(currentDate).format("YYYY년 MM월")}
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

        <Calendar
          localizer={localizer}
          events={events}
          defaultView={view}
          view={view}
          onView={(newView) => setView(newView)}
          selectable
          date={currentDate}
          onNavigate={handleNavigate}
          onSelectSlot={handleSelectSlot}
          style={{
            height: "calc(100vh - 140px)",
            width: "100%",
          }}
          toolbar={false}
          formats={{
            timeGutterFormat: (date) => calendarTime(moment(date).hour()),
            dayFormat: (date) => {
              const day = moment(date).format("ddd");
              const dayOfMonth = moment(date).date();
              return `${daysInKorean[day]} ${dayOfMonth}일`;
            },
            weekdayFormat: (date) => {
              const day = moment(date).format("ddd");
              return daysInKorean[day]; // 월간 뷰에서 요일을 한국어로 출력
            },
          }}
          step={30}
          components={{
            timeSlotWrapper: (props) => (
              <div
                {...props}
                style={{
                  padding: "20px 16px",
                  color: "#ADB8CC",
                  fontWeight: "600",
                  fontSize: "0.8rem",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {props.children}
              </div>
            ),
          }}
          eventPropGetter={() => ({
            style: {
              backgroundColor: "rgba(201, 212, 57, 0.2)",
              border: "none",
              borderLeft: "2px solid #C9D439",
              color: "black",
            },
          })}
          dayPropGetter={(date) => {
            if (moment(date).isSame(new Date(), "day")) {
              return {
                style: {
                  backgroundColor: "transparent",
                },
              };
            }
            return {};
          }}
        />
      </div>
      <CanlendarSideModal isOpen={isOpen} currentDate={currentDate} />
    </div>
  );
};

export default Page;
