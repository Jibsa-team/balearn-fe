import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CurEventDto, Mission, UpdateEventDto } from "@/types/calendar/event";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CalendarEventSkeleton from "../skeleton/calendar.event";
import { Goal } from "@/types/dashboard/dashboard";
import CalendarGoal from "./goal";
import CalendarDate from "./date";
import { useToast } from "@/hooks/use-toast";
import moment from "moment";
import { useParams } from "next/navigation";
import CalendarMission from "./mission";
import DeleteEventModal from "./deleteEventModal";

const fetchEventDetails = async (eventId: number): Promise<CurEventDto> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/schedule/${eventId}`
  );

  if (!response.ok) {
    throw new Error("일정 조회에 실패했습니다.");
  }

  const result = await response.json();
  return result.result;
};

const updateEvent = async (eventData: UpdateEventDto) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/schedule/${eventData.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    }
  );

  const result = await response.json();
  if (!response.ok || result.responseCode !== "SUCCESS") {
    throw new Error(result.message || "일정 수정에 실패했습니다.");
  }

  return result;
};

function SideModalEvent({
  isOpen,
  eventId,
  onClose,
}: {
  isOpen: boolean;
  eventId: number | undefined;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedGoal, setSelectedGoal] = useState<Goal>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [color, setColor] = useState<string>("");
  const [missions, setMissions] = useState<Mission[]>([]);
  const [deleteMissions, setDeleteMissions] = useState<number[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => fetchEventDetails(eventId!),
    enabled: !!eventId,
  });

  console.log(data);
  useEffect(() => {
    if (data) {
      const startDateTime = moment(data.startTime);
      setStartDate(startDateTime.toDate());
      setStartTime(startDateTime.hour());

      const endDateTime = moment(data.endTime);
      setEndDate(endDateTime.toDate());
      setEndTime(endDateTime.hour());

      setColor(data.color);

      if (data.mission) {
        setMissions(
          data.mission.map((mission) => ({
            id: mission.id,
            detail: mission.detail,
          }))
        );
      }

      setSelectedGoal({
        id: 0,
        detail: data.topic,
        color: data.color,
      });
    }
  }, [data]);

  const updateEventMutation = useMutation({
    mutationFn: updateEvent,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["event", eventId],
        exact: true,
        refetchType: "active",
      });

      await queryClient.invalidateQueries({
        queryKey: ["events"],
      });
      toast({
        title: "일정 수정 성공",
        description: "일정이 성공적으로 수정되었습니다.",
        variant: "default",
      });

      onClose();
    },
    onError: (error: Error) => {
      toast({
        title: "일정 수정 실패",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleUpdateEvent = () => {
    if (!selectedGoal || !startDate || !endDate || id === undefined) {
      toast({
        title: "일정 수정 실패",
        description: "모든 필드를 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    const formatDateTime = (date: Date, time: number) => {
      const updatedDate = new Date(date);
      updatedDate.setHours(time, 0, 0, 0);
      return moment(updatedDate).format("YYYY-MM-DDTHH:mm:ss");
    };

    const missionData = missions.map((mission) => {
      const isExistingMission = data?.mission?.some((m) => m.id === mission.id);
      return isExistingMission
        ? { id: mission.id, detail: mission.detail }
        : { detail: mission.detail };
    });

    const updateData: UpdateEventDto = {
      id: eventId as number,
      teamId: id,
      address: "string",
      startTime: formatDateTime(startDate, startTime),
      endTime: formatDateTime(endDate, endTime),
      topic: selectedGoal.detail,
      color,
      missions: missionData,
      deleteMissions,
    };

    updateEventMutation.mutate(updateData);
  };

  const handleDeleteEvent = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/schedule/${data?.id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();
      await queryClient.invalidateQueries({
        queryKey: ["events"],
      });

      await queryClient.removeQueries({
        queryKey: ["event", data?.id],
      });

      toast({
        title: "일정 삭제 성공",
        description: "일정이 성공적으로 삭제되었습니다.",
        variant: "default",
      });

      setIsDeleteModalOpen(false);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        className={`bg-white shadow-lg rounded-lg p-4 w-[300px] z-20 absolute right-0 top-0 h-[100%]
        md:w-[500px] lg:z-10 lg:static`}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {isLoading ? (
          <CalendarEventSkeleton />
        ) : isError ? (
          <div className="text-red-500">일정을 불러오는데 실패했습니다.</div>
        ) : data ? (
          <div>
            <div className="w-full text-[1.2rem] font-semibold mb-[20px]">
              일정 수정
            </div>
            <CalendarGoal
              setSelectedGoal={setSelectedGoal}
              selectedGoal={selectedGoal}
              setColor={setColor}
            />
            <CalendarMission
              setMissions={setMissions}
              missions={missions}
              setDeleteMissions={setDeleteMissions}
            />
            <CalendarDate
              view="week"
              setStartDate={setStartDate}
              startDate={startDate}
              setStartTime={setStartTime}
              startTime={startTime}
              setEndDate={setEndDate}
              endDate={endDate}
              setEndTime={setEndTime}
              endTime={endTime}
            />
            <button
              onClick={handleUpdateEvent}
              className="w-full bg-logoColor text-white mt-[30px] py-[5px] rounded-lg"
            >
              {updateEventMutation.isPending ? "수정중" : "수정하기"}
            </button>
            <button
              onClick={handleDeleteEvent}
              className="w-full bg-[#FB4358] text-white mt-[10px] py-[5px] rounded-lg"
            >
              일정 삭제하기
            </button>
          </div>
        ) : null}
      </motion.div>
      <DeleteEventModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirmDelete={confirmDelete}
        isDeleting={isDeleting}
      />
    </>
  );
}

export default SideModalEvent;
