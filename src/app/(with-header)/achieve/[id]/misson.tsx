"use client";

import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import MissionSkeleton from "@/components/skeleton/missonSkelton";
import { useToast } from "@/hooks/use-toast";
import { MissionDto } from "@/types/leaderboard/leaderboard";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

async function getAllMisson(id: string): Promise<MissionDto[]> {
  try {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/schedule/today/team/${id}`
    );
    const result = await response.json();
    return result.result[0].mission;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function submitMissions(params: {
  id: string;
  createIds: number[];
  deleteIds: number[];
}) {
  try {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard/${params.id}/clear`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          createIds: params.createIds,
          deleteIds: params.deleteIds,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("미션 제출 실패");
    }

    return await response.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function Mission() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [newCompletedMissions, setNewCompletedMissions] = useState<number[]>(
    []
  );
  const [canceledMissions, setCanceledMissions] = useState<number[]>([]);
  const { toast } = useToast();

  const { data, isLoading, isError } = useQuery<MissionDto[]>({
    queryKey: ["mission", id],
    queryFn: () => getAllMisson(id as string),
    enabled: !!id,
  });

  const submitMutation = useMutation({
    mutationFn: submitMissions,
    onSuccess: async (response) => {
      console.log("미션 제출 성공", response);
      await queryClient.refetchQueries({
        queryKey: ["mission", id],
        type: "active",
      });
      queryClient.invalidateQueries({ queryKey: ["leaderboard", id] });
      setNewCompletedMissions([]);
      setCanceledMissions([]);

      toast({
        title: "미션 제출 성공",
        description: "미션이 성공적으로 제출되었습니다.",
        variant: "default",
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage =
        error.response?.message || error.message || "미션 제출 실패";
      toast({
        title: "일정 수정 실패",
        description: errorMessage,
        variant: "destructive",
      });
      setNewCompletedMissions([]);
      setCanceledMissions([]);
    },
  });

  const toggleMission = (missionId: number) => {
    setNewCompletedMissions((prev) =>
      prev.includes(missionId)
        ? prev.filter((id) => id !== missionId)
        : [...prev, missionId]
    );
  };

  const toggleCanceledMission = (missionId: number) => {
    setCanceledMissions((prev) =>
      prev.includes(missionId)
        ? prev.filter((id) => id !== missionId)
        : [...prev, missionId]
    );
  };

  const handleSubmit = () => {
    if (
      id &&
      (newCompletedMissions.length > 0 || canceledMissions.length > 0)
    ) {
      submitMutation.mutate({
        id: id as string,
        createIds: newCompletedMissions,
        deleteIds: canceledMissions,
      });
    }
  };

  if (isLoading) return <MissionSkeleton />;
  if (isError) return <span>에러가 발생했습니다.</span>;

  return (
    <div className="md:mt-[60px] mt-[15px] p-4">
      <h2 className="text-[1.2rem] md:text-2xl font-bold mb-4">
        오늘의 미션 달성해주세요
      </h2>
      <ul className="mb-4">
        {data?.map((mission) => (
          <li
            key={mission.id}
            className="flex items-center mb-2 cursor-pointer justify-between"
          >
            <div
              className="flex items-center flex-grow"
              onClick={() => toggleMission(mission.id)}
            >
              <FaStar
                className={`mr-2 text-[1.7rem] font-semibold ${
                  mission.clear || newCompletedMissions.includes(mission.id)
                    ? "text-logoColor"
                    : "text-gray-300"
                }`}
              />
              <span className="text-[1.2rem] ml-2">{mission.detail}</span>
            </div>
            <button
              onClick={() => toggleCanceledMission(mission.id)}
              className={`ml-2 px-2 py-1 rounded text-sm ${
                canceledMissions.includes(mission.id)
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              취소
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleSubmit}
        disabled={
          (newCompletedMissions.length === 0 &&
            canceledMissions.length === 0) ||
          submitMutation.isPending
        }
        className={`w-full flex justify-center items-center px-4 md:py-2 py-1 rounded text-lg mt-[10px] 
          ${
            newCompletedMissions.length > 0 || canceledMissions.length > 0
              ? "bg-logoColor text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
      >
        {submitMutation.isPending ? "제출 중..." : "제출"}
      </button>
    </div>
  );
}

export default Mission;
