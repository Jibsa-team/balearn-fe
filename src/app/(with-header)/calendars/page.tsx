"use client";

import React, { useState } from "react";
import { Calendar, momentLocalizer, SlotInfo, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
}

function Page() {
  const [view, setView] = useState<View>("week"); // 현재 뷰 상태
  const [events, setEvents] = useState<Event[]>([]); // 이벤트 데이터
  const [currentDate, setCurrentDate] = useState<Date>(new Date()); // 현재 날짜 상태

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    const title = prompt("Enter event title:");
    if (title) {
      // 특정 시간 (예: 3시 ~ 4시)으로 설정
      const startTime = moment(slotInfo.start)
        .set({ hour: 8, minute: 0, second: 0 })
        .toDate(); // 3시 0분 0초
      const endTime = moment(startTime).add(3, "hour").toDate(); // 4시 0분 0초

      setEvents([
        ...events,
        {
          start: startTime,
          end: endTime,
          title,
        },
      ]);
    }
  };

  const handleNavigate = (date: Date) => {
    setCurrentDate(date); // 현재 날짜 업데이트
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
    <div className="w-[95%] justify-center items-center bg-white shadow-md px-10 relative">
      <div className="w-[100%]">
        <div className="flex justify-between mb-4 items-center">
          <div></div>
          <div className="flex items-center">
            {/* 왼쪽 화살표 */}
            <button
              className="w-10 h-10  flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
              onClick={navigateToPrevious}
            >
              &#8249;
            </button>

            {/* 현재 날짜 */}
            <div className="text-lg font-bold mx-[10px]">
              {moment(currentDate).format("MMMM YYYY")}
            </div>

            {/* 오른쪽 화살표 */}
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
              onClick={navigateToNext}
            >
              &#8250;
            </button>
          </div>

          <div className="flex justify-center mb-4">
            <button
              className={`border border-gray-300 rounded-full px-4 py-2 mr-2 ${
                view === "week" ? "text-blue-500" : ""
              }`}
              onClick={() => setView("week")}
            >
              Week
            </button>
            <button
              className={`border border-gray-300 rounded-full px-4 py-2 ${
                view === "month" ? "text-blue-500" : ""
              }`}
              onClick={() => setView("month")}
            >
              Month
            </button>
          </div>
        </div>

        <Calendar
          localizer={localizer}
          events={events}
          defaultView={view}
          view={view}
          onView={(newView) => setView(newView)} // 뷰 변경
          selectable
          date={currentDate} // 현재 날짜 설정
          onNavigate={handleNavigate} // 날짜 변경 이벤트
          onSelectSlot={handleSelectSlot} // 날짜 선택 이벤트
          style={{ height: "calc(100vh - 200px)" }} // 캘린더 높이
          toolbar={false} // 기본 툴바 비활성화
          formats={{
            timeGutterFormat: "HH", // 24시간 형식
            dayFormat: "ddd\nD", // 요일과 날짜를 두 줄로 표시 (예: "Sun\n29")
          }}
          step={30} // 30분 간격
          components={{
            timeSlotWrapper: (props) => (
              <div
                {...props}
                style={{
                  padding: "10px", // 적당한 padding 설정
                  color: "#ADB8CC",
                  fontWeight: "600",
                  height: "40px",
                  display: "flex", // 가운데 정렬을 위한 flex 설정
                  justifyContent: "center", // 시간 텍스트 가운데 정렬
                  alignItems: "center", // 세로로도 가운데 정렬
                }}
              >
                {props.children}
              </div>
            ),
          }}
          eventPropGetter={() => ({
            style: {
              backgroundColor: "rgba(201, 212, 57, 0.2)",
              border: "3px solid #C9D439",
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
    </div>
  );
}

export default Page;
