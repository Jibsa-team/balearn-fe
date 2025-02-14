"use client";

import React, { useState } from "react";
import { Calendar, momentLocalizer, SlotInfo, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { calendarTime } from "@/utils/calendar";
import CanlendarSideModal from "@/components/calendar/sideModal";
import { CreateEventDto, CustomEvent, EventDto } from "@/types/calendar/event";
import { Goal } from "@/types/dashboard/dashboard";
import { Mission } from "@/types/calendar/event";
import { useParams } from "next/navigation";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import moment from "moment-timezone";
import { hexToRgba } from "@/app/lib/color";
import CalendarsHeader from "./calendars.header";
import { Days } from "@/types/calendar/day";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import SideModalEvent from "@/components/calendar/sideModal.event";

const localizer = momentLocalizer(moment);

interface EventWithColor extends CustomEvent {
  color?: string;
}

const daysInKorean: Days = {
  Sun: "일",
  Mon: "월",
  Tue: "화",
  Wed: "수",
  Thu: "목",
  Fri: "금",
  Sat: "토",
};

const fetchCalendarEvents = async (
  teamId: string,
  date: Date,
  view: View
): Promise<CustomEvent[]> => {
  const year = moment(date).year();
  const month = moment(date).month() + 1;
  const week = moment(date).isoWeek();

  const endpoint =
    view === "week"
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/schedule/week/team/${teamId}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/schedule/month/team/${teamId}`;

  const response = await fetchWithAuth(
    `${endpoint}?year=${year}&month=${month}&week=${week}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("일정 조회 실패");
  }

  const data = await response.json();

  return data.result.map((event: EventDto) => ({
    start: moment.utc(event.startTime).tz("Asia/Seoul", true).toDate(),
    end: moment.utc(event.endTime).tz("Asia/Seoul", true).toDate(),
    title: event.topic,
    color: event.color,
    id: event.id,
  }));
};

const createCalendarEvent = async (
  eventData: CreateEventDto
): Promise<EventDto> => {
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

  const result = await response.json();

  if (!response.ok || result.responseCode !== "SUCCESS") {
    throw new Error(result.message || "이벤트 등록 실패");
  }

  return result;
};

const Page: React.FC = () => {
  const [view, setView] = useState<View>("week");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectDate, setSelectDate] = useState<Date>(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState<number>(0);
  const [selectedEndTime, setSelectedEndTime] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenEvent, setIsOpenEvent] = useState<boolean>(false);
  const [selectEventId, setSelectEventId] = useState<number>();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: events = [] } = useQuery({
    queryKey: ["events", id, moment(currentDate).format("YYYY-MM-DD"), view],
    queryFn: () => fetchCalendarEvents(id as string, currentDate, view),
  });

  const createEventMutation = useMutation({
    mutationFn: (eventData: CreateEventDto) => createCalendarEvent(eventData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["weeklyStudy", id] });
      toast({
        title: "일정 등록 성공",
        description: "일정이 성공적으로 등록되었습니다.",
        variant: "default",
      });
      setIsOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "일정 등록 실패",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    const startTime = new Date(slotInfo.slots[0]).getHours();
    const endTime = new Date(
      slotInfo.slots[slotInfo.slots.length - 1]
    ).getHours();
    setSelectedStartTime(startTime);
    setSelectedEndTime(endTime);
    setSelectDate(slotInfo.start);
    setIsOpen((prev) => !prev);
    setIsOpenEvent(false);
  };

  const handleSelectEvent = async (event: EventWithColor) => {
    setIsOpenEvent(true);
    setSelectEventId(event.id);
    setIsOpen(false);
  };

  const handleAddEvent = (
    selectedGoal: Goal,
    startDate: Date,
    endDate: Date,
    startTime: number,
    endTime: number,
    color: string,
    missions: Mission[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteMissions: number[]
  ) => {
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
      missions: missions.map((mission) => ({
        detail: mission.detail,
      })),
    };

    createEventMutation.mutate(newEvent);
  };

  const handleRangeChange = (
    range: Date[] | { start: Date; end: Date },
    viewType?: View
  ) => {
    let targetDate: Date;
    if (Array.isArray(range)) {
      targetDate = range[0];
    } else {
      targetDate = range.start;
    }
    setCurrentDate(targetDate);
    if (viewType) setView(viewType);
  };

  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <div className="w-full bg-white flex">
      <div className="w-full">
        <CalendarsHeader
          view={view}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          setView={setView}
          fetchEvents={() =>
            queryClient.invalidateQueries({ queryKey: ["events"] })
          }
        />
        <Calendar<EventWithColor, object>
          localizer={localizer}
          events={events}
          onRangeChange={handleRangeChange}
          defaultView={view}
          culture="ko"
          view={view}
          onView={(newView) => setView(newView)}
          selectable
          date={currentDate}
          onNavigate={handleNavigate}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          style={{
            height: "calc(100vh - 140px)",
            width: "100%",
          }}
          toolbar={false}
          formats={{
            timeGutterFormat: (date) => calendarTime(moment(date).hour()),
            dayFormat: (date) => {
              const day = moment(date).format("ddd");
              return `${daysInKorean[day]}`;
            },
            weekdayFormat: (date) => {
              const day = moment(date).format("ddd");
              return daysInKorean[day];
            },
          }}
          step={30}
          timeslots={4}
          components={{
            // eslint-disable-next-line @typescript-eslint/no-empty-object-type
            timeSlotWrapper: (props: React.PropsWithChildren<{}>) => (
              <div
                {...props}
                style={{
                  color: "#ADB8CC",
                  fontWeight: "600",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minWidth: "34.59px",
                }}
                className="h-[40px] md:[80px] text-[0.6rem] md:text-[0.8rem]"
              >
                {props.children}
              </div>
            ),
          }}
          eventPropGetter={(event: EventWithColor) => ({
            style: {
              backgroundColor: hexToRgba(event.color as string, 0.07),
              border: "none",
              borderLeft: `4px solid ${event.color}`,
              color: event.color,
              fontWeight: "bold",
            },
          })}
          dayPropGetter={(date) => {
            const isToday = moment(date).isSame(new Date(), "day");
            if (view === "month") {
            }

            if (view === "week") {
            }

            if (isToday) {
              return {
                style: {
                  backgroundColor: "transparent",
                  border: "none",
                },
              };
            }

            return {};
          }}
        />
      </div>
      <CanlendarSideModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectDate={selectDate}
        view={view}
        handleAddEvent={handleAddEvent}
        isLoading={createEventMutation.isPending}
        selectedStartTime={selectedStartTime as number}
        selectedEndTime={selectedEndTime as number}
      />
      <SideModalEvent
        isOpen={isOpenEvent}
        onClose={() => setIsOpenEvent(false)}
        eventId={selectEventId}
      />
    </div>
  );
};

export default Page;
