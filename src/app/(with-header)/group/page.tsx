"use client";

import TextInput from "@/components/group/input/textInput";
import React, { useState } from "react";
import GroupProfile from "./groupProfile";
import GoalList from "./goalList";
import { z } from "zod";
import GroupAddError from "@/components/error/groupAddError";
import { formSchema } from "./schema";

function Page() {
  const [groupName, setGroupName] = useState("");
  const [groupPurpose, setGroupPurpose] = useState("");
  const [goals, setGoals] = useState<{ goal: string; color: string }[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const isFormValid = () => {
    const formData = { groupName, groupPurpose, goals, profileImage };
    const result = formSchema.safeParse(formData);
    return result.success && profileImage !== null;
  };

  const handleCreate = () => {
    try {
      const formData = {
        groupName,
        groupPurpose,
        goals,
        profileImage,
      };
      formSchema.parse(formData);
      alert("모임이 성공적으로 생성되었습니다!");
      console.log(formData);
      setErrors({});
    } catch (err) {
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
    <div className="w-[95%] h-[100%] p-[30px] bg-white">
      <h1 className="text-xl font-semibold mb-[40px]">모임 관리</h1>
      <div className="flex w-full justify-between">
        <div className="w-[48%]">
          {/* 모임명 입력 */}
          <div className="flex flex-col items-start mb-[30px] font-semibold">
            <span>모임명</span>
            <TextInput
              message={"모임명을 입력해주세요."}
              width={100}
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            {errors.groupName && <GroupAddError errors={errors.groupName} />}
          </div>

          {/* 모임 목적 입력 */}
          <div className="flex flex-col items-start mb-[30px] font-semibold">
            <span>모임 목적</span>
            <TextInput
              message={"모임 목적을 입력해주세요."}
              width={100}
              value={groupPurpose}
              onChange={(e) => setGroupPurpose(e.target.value)}
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
          <GroupProfile
            profileImage={profileImage}
            setProfileImage={setProfileImage}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
