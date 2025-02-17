"use client";

import { useState, useCallback } from "react";
import GroupProfile from "./groupProfile";
import GoalList from "./goalList";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import useGroupStore from "@/store/useGroupStore";
import { useRouter } from "next/navigation";
import { requiredFieldsSchema } from "./schema";
import GroupInput from "./groupInput";

function Page() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goals, setGoals] = useState<{ detail: string; color: string }[]>([]);
  const [image, setImage] = useState<File | null>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const setGroupId = useGroupStore((state) => state.setGroupId);
  const router = useRouter();

  const handleNameChange = useCallback((value: string) => {
    setName(value);
  }, []);

  const handleDescriptionChange = useCallback((value: string) => {
    setDescription(value);
  }, []);

  const handleGoalsChange = useCallback(
    (newGoals: { detail: string; color: string }[]) => {
      setGoals(newGoals);
    },
    []
  );

  const handleImageChange = useCallback((newImage: File | null) => {
    setImage(newImage);
  }, []);

  const isFormValid = useCallback(() => {
    const validationResult = requiredFieldsSchema.safeParse({
      name,
      description,
      goals,
    });
    return validationResult.success && goals.length > 0;
  }, [name, description, goals]);

  const handleCreate = async () => {
    if (!isFormValid() || isLoading) return;

    setIsLoading(true);
    try {
      const formDataObj = new FormData();
      const blob = new Blob([JSON.stringify({ name, description, goals })], {
        type: "application/json",
      });

      formDataObj.append("data", blob);
      if (image) {
        formDataObj.append("image", image);
      }

      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/team/create`,
        {
          method: "POST",
          body: formDataObj,
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const result = await response.json();
      setGroupId(result.result.teamId);
      router.push(`/dashboard/${result.result.teamId}`);
    } catch (err) {
      console.error("Error during group creation:", err);
      setErrors({ submit: "모임 생성에 실패했습니다." });
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonStyle = useCallback(() => {
    if (isLoading) return "bg-disabledColor text-gray-200 cursor-not-allowed";
    return isFormValid()
      ? "bg-logoColor text-white cursor-pointer"
      : "bg-disabledColor text-gray-200 cursor-not-allowed";
  }, [isLoading, isFormValid]);

  console.log("chekc");
  return (
    <div className="w-[100%] h-[100%] sm:p-[30px] p-[15px] bg-white overflow-y-scroll">
      <h1 className="text-xl font-semibold mb-[40px]">모임 생성</h1>
      <div className="flex w-full flex-col-reverse justify-between">
        <div className="sm:w-[48%] w-full">
          <GroupInput
            label="모임명"
            placeholder="모임명을 입력해주세요."
            onStateChange={handleNameChange}
          />
          <GroupInput
            label="모임 목적"
            placeholder="모임 목적을 입력해주세요."
            onStateChange={handleDescriptionChange}
          />
          <GoalList
            goals={goals}
            setGoals={handleGoalsChange}
            errors={errors.goals}
          />
          <div className="w-full flex justify-between mt-[50px]">
            <div></div>
            <button
              onClick={handleCreate}
              className={`px-[70px] py-[5px] rounded-md text-white ${getButtonStyle()}`}
              disabled={!isFormValid() || isLoading}
            >
              {isLoading ? "생성중..." : "생성하기"}
            </button>
          </div>
        </div>
        <div className="sm:w-[48%] w-full">
          <GroupProfile
            profileImage={image}
            setProfileImage={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
