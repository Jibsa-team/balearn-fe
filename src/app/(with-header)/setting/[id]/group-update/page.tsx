/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import TextInput from "@/components/group/input/textInput";
import React, { useEffect, useState } from "react";
import GroupProfile from "./groupProfile";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardType } from "@/types/dashboard/dashboard";
import { useQueryClient } from "@tanstack/react-query";
import GoalList from "./goalList";
import { useToast } from "@/hooks/use-toast";
import DeleteGroupModal from "@/components/modal/deleteGroup";

const fetchTeamDetail = async (
  teamId: string | string[]
): Promise<DashboardType> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/team/${teamId}`
  );
  return response.json();
};

const deleteTeam = async (teamId: string) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/team/${teamId}`,
    {
      method: "DELETE",
    }
  );
  return response.json();
};

function Page() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goals, setGoals] = useState<
    { id?: number; detail: string; color: string }[]
  >([]);
  const [deleteId, setDeleteId] = useState<(number | undefined)[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [image, setImage] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: teamData, isLoading } = useQuery<DashboardType>({
    queryKey: ["dashboardData", id],
    queryFn: () => fetchTeamDetail(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (teamData?.result) {
      const team = teamData.result.team;
      const teamGoals = teamData.result.goal;

      setName(team.name);
      setDescription(team.description);
      setOriginalImage(team.imgUrl);

      setGoals(
        teamGoals.map((goal) => ({
          id: goal.id,
          detail: goal.detail,
          color: goal.color,
        }))
      );
    }
  }, [teamData]);

  const handleUpdate = async () => {
    try {
      setUpdateLoading(true);
      const formData = new FormData();
      const blob = new Blob(
        [
          JSON.stringify({
            name,
            description,
            goals: goals.map((goal) => ({
              id: goal.id,
              detail: goal.detail,
              color: goal.color,
            })),
            deleteGoals: deleteId,
          }),
        ],
        {
          type: "application/json",
        }
      );

      formData.append("data", blob);
      if (image) {
        formData.append("image", image);
      }

      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/team/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = await response.json();
      console.log(result);
      queryClient.invalidateQueries({ queryKey: ["dashboardData", id] });
      queryClient.invalidateQueries({ queryKey: ["teamInfo", id] });

      toast({
        title: "모임 수정 성공",
        description: "일정이 성공적으로 등록되었습니다.",
        variant: "default",
      });
      setErrors({});
    } catch (err) {
      console.error("Error during group update:", err);
    } finally {
      setUpdateLoading(false);
    }
  };

  const deleteTeamMutation = useMutation({
    mutationFn: () => deleteTeam(id as string),
    onSuccess: async () => {
      try {
        const response = await fetchWithAuth(
          `${process.env.NEXT_PUBLIC_API_URL}/api/team/list`
        );
        const result = await response.json();

        toast({
          title: "모임 삭제 성공",
          description: "모임이 성공적으로 삭제되었습니다.",
          variant: "default",
        });

        queryClient.invalidateQueries({ queryKey: ["groupList"] });
        queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
        queryClient.invalidateQueries({ queryKey: ["teamInfo"] });

        if (result.result && result.result.length > 0) {
          router.push(`/dashboard/${result.result[0].id}`);
        } else {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching team list:", error);
        router.push("/dashboard");
      }
    },
    onError: () => {
      toast({
        title: "모임 삭제 실패",
        description: "모임 삭제 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  const handleDelete = () => {
    deleteTeamMutation.mutate();
  };

  if (isLoading) return <Skeleton />;

  return (
    <div className="w-[100%] h-[100%] p-[30px] bg-white overflow-y-scroll">
      <h1 className="text-xl font-semibold mb-[40px]">모임 수정</h1>
      <div className="flex flex-col-reverse md:flex-row w-full justify-between">
        <div className="sm:w-[48%] w-full">
          <div className="mb-[40px]">
            <span>모임명</span>
            <TextInput
              message={"모임명을 입력해주세요."}
              width={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <GoalList
            goals={goals}
            setGoals={setGoals}
            setDeleteId={setDeleteId}
            errors={errors.goals}
          />

          <div className="flex justify-between items-center">
            <button
              onClick={handleUpdate}
              className="w-[45%] flex justify-center py-[5px] sm:text-[1rem] text-[0.9rem] rounded-md text-white bg-logoColor cursor-pointer"
              disabled={updateLoading}
            >
              <span>{updateLoading ? "수정중..." : "수정"}</span>
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="w-[45%] flex justify-center py-[5px] sm:text-[1rem] text-[0.9rem] rounded-md text-white bg-red-600 cursor-pointer"
            >
              <span>삭제</span>
            </button>
          </div>
        </div>
        <div className="sm:w-[48%] w-full">
          <GroupProfile
            profileImage={image}
            setProfileImage={setImage}
            originalImage={originalImage}
          />
        </div>
        <DeleteGroupModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleDelete}
          isDeleting={deleteTeamMutation.isPending}
        />
      </div>
    </div>
  );
}

export default Page;
