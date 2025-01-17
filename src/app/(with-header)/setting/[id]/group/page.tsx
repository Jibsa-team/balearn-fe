"use client";

import TextInput from "@/components/group/input/textInput";
import React, { useState } from "react";
import GroupProfile from "./groupProfile";
import GoalList from "./goalList";
import { z } from "zod";
import GroupAddError from "@/components/error/groupAddError";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import useGroupStore from "@/store/useGroupStore";
import { GroupDTO } from "@/types/group/group";
import { useRouter } from "next/navigation";
import { formSchema } from "./schema";

function Page() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goals, setGoals] = useState<{ detail: string; color: string }[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [image, setImage] = useState<File | null>(null);
  const setGroupId = useGroupStore((state) => state.setGroupId);
  const router = useRouter();

  const isFormValid = () => {
    const formData = { name, description, goals, image };
    const result = formSchema.safeParse(formData);
    return result.success && image !== null;
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();

      const blob = new Blob([JSON.stringify({ name, description, goals })], {
        type: "application/json",
      });

      formData.append("data", blob);

      if (image) {
        formData.append("image", image);
      }

      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/team/create`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result: GroupDTO = await response.json();
      setGroupId(result.result.teamId);
      router.push(`/dashboard/${result.result.teamId}`);
      setErrors({});
    } catch (err) {
      console.error("Error during group creation:", err);

      if (err instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        err.errors.forEach((error) => {
          const field = error.path.join(".");
          fieldErrors[field] = error.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="w-[100%] h-[100%] p-[30px] bg-white">
      <h1 className="text-xl font-semibold mb-[40px]">모임 관리</h1>
      <div className="flex w-full justify-between">
        <div className="w-[48%]">
          {/* 모임명 입력 */}
          <div className="flex flex-col items-start mb-[30px] font-semibold">
            <span>모임명</span>
            <TextInput
              message={"모임명을 입력해주세요."}
              width={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.groupName && <GroupAddError errors={errors.groupName} />}
          </div>

          {/* 모임 목적 입력 */}
          <div className="flex flex-col items-start mb-[30px] font-semibold">
            <span>모임 목적</span>
            <TextInput
              message={"모임 목적을 입력해주세요."}
              width={100}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.groupPurpose && (
              <GroupAddError errors={errors.groupPurpose} />
            )}
          </div>

          {/* 목표 목록 */}
          <GoalList goals={goals} setGoals={setGoals} errors={errors.goals} />

          {/* 생성하기 버튼 */}
          <div className="w-full flex justify-between mt-[50px]">
            <div></div>
            <div
              onClick={handleCreate}
              className={`px-[70px] py-[5px] rounded-md text-white ${
                isFormValid()
                  ? "bg-logoColor text-white cursor-pointer"
                  : "bg-disabledColor text-gray-200 cursor-not-allowed"
              }`}
            >
              생성하기
            </div>
          </div>
        </div>
        <div className="w-[48%]">
          <GroupProfile profileImage={image} setProfileImage={setImage} />
        </div>
      </div>
    </div>
  );
}

export default Page;
