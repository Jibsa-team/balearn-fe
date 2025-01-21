"use client";

import React, { useState } from "react";
import { Calendar, momentLocalizer, SlotInfo, View } from "react-big-calendar"; // TimeSlotWrapperProps 추가
import "react-big-calendar/lib/css/react-big-calendar.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { calendarTime } from "@/utils/calendar";
import CanlendarSideModal from "@/components/calendar/sideModal";
import { Event, CustomEvent } from "@/types/calendar/event";
import { Goal } from "@/types/dashboard/dashboard";
import { useParams } from "next/navigation";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import moment from "moment-timezone";
import { hexToRgba } from "@/app/lib/color";

const localizer = momentLocalizer(moment);

type EventWithColor = Event & {
  color?: string;
};

type dayProps = {
  [key: string]: string;
  Sun: string;
  Mon: string;
  Tue: string;
  Wed: string;
  Thu: string;
  Fri: string;
  Sat: string;
};

const daysInKorean: dayProps = {
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
  const [events, setEvents] = useState<CustomEvent[]>([
    {
      start: new Date(),
      end: new Date(),
      title: "Test Event",
      color: "#FF0000",
    },
  ]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectDate, setSelectDate] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { id } = useParams();

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectDate(slotInfo.start);
    setIsOpen((prev) => !prev);
  };

  const createEvent = async (eventData: Event) => {
    try {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/schedule/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        }
      );

      if (!response.ok) {
        throw new Error("이벤트 등록 실패");
      }

      const result = await response.json();

      const startTime = moment
        .utc(result.result.startTime)
        .tz("Asia/Seoul", true)
        .toDate();
      const endTime = moment
        .utc(result.result.endTime)
        .tz("Asia/Seoul", true)
        .toDate();

      const newEvent = {
        ...result,
        start: startTime,
        end: endTime,
        title: result.result.topic,
        color: result.result.color,
      };

      setEvents((prevEvents) => [...prevEvents, newEvent]);
      return result;
    } catch (error) {
      console.error("이벤트 등록 에러:", error);
      throw error;
    }
  };

  const handleAddEvent = (
    selectedGoal: Goal,
    startDate: Date,
    endDate: Date,
    startTime: number,
    endTime: number,
    color: string
  ) => {
    console.log(startDate, startTime, endDate, endTime, color);

    const formatDateTime = (date: Date, time: number) => {
      const hours = time;
      const minutes = 0;

      const combinedDate = new Date(date);
      combinedDate.setHours(hours, minutes, 0, 0);

      return moment(combinedDate).format("YYYY-MM-DDTHH:mm:ss");
    };

    const newEvent = {
      teamId: id,
      address: "string",
      startTime: formatDateTime(startDate, startTime),
      endTime: formatDateTime(endDate, endTime),
      topic: selectedGoal.detail,
      color,
      missions: [
        {
          detail: selectedGoal.detail,
        },
      ],
    };

    console.log("newEvent:", newEvent);
    createEvent(newEvent);
  };

  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
    const startOfMonth = moment(date).startOf("month").toDate();
    const endOfMonth = moment(date).endOf("month").toDate();
    console.log(startOfMonth, endOfMonth);
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

  console.log(events);

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

        <Calendar
          localizer={localizer}
          events={events}
          onRangeChange={(range, view) => {
            console.log("onRangeChange triggered");
            console.log("Current view:", view);
            console.log("Range:", range);
          }}
          defaultView={view}
          culture="ko"
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
              //const dayOfMonth = moment(date).date();
              return `${daysInKorean[day]}`;
            },
            weekdayFormat: (date) => {
              const day = moment(date).format("ddd");
              return daysInKorean[day];
            },
          }}
          step={30}
          components={{
            // eslint-disable-next-line @typescript-eslint/no-empty-object-type
            timeSlotWrapper: (props: React.PropsWithChildren<{}>) => (
              <div
                {...props}
                style={{
                  color: "#ADB8CC",
                  fontWeight: "600",
                  fontSize: "0.8rem",
                  height: "80px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {props.children}
              </div>
            ),
          }}
          eventPropGetter={(event: EventWithColor) => {
            const rgbaColor = hexToRgba(event.color as string, 0.07);
            return {
              style: {
                backgroundColor: rgbaColor,
                border: "none",
                borderLeft: `4px solid ${event.color}`,
                color: event.color,
                fontSize: "1.1rem",
                fontWeight: "bord",
                borderRadius: "4px",
                padding: "10px",
              },
            };
          }}
          dayPropGetter={(date) => {
            const dayOfWeek = moment(date).day();
            const isToday = moment(date).isSame(new Date(), "day");

            if (view === "month") {
              if (dayOfWeek === 0 || dayOfWeek === 6) {
                return {
                  style: {
                    backgroundColor: "transparent",
                  },
                };
              }

              if (isToday) {
                return {
                  style: {
                    backgroundColor: "transparent",
                    border: "none",
                  },
                };
              }
            }

            if (view === "week") {
              if (dayOfWeek === 0 || dayOfWeek === 6) {
                return {
                  style: {
                    display: "none",
                  },
                };
              }

              if (isToday) {
                return {
                  style: {
                    backgroundColor: "transparent",
                    border: "none",
                  },
                };
              }
            }

            return {};
          }}
        />
      </div>
      <CanlendarSideModal
        isOpen={isOpen}
        selectDate={selectDate}
        view={view}
        handleAddEvent={handleAddEvent}
      />
    </div>
  );
};

export default Page;
