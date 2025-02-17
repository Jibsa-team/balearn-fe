"use client";

import TextInput from "@/components/group/input/textInput";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import GroupAddError from "@/components/error/ErrorMessage";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import useAuthStore from "@/store/useAuthStore";
import { formSchema } from "./schema";
import UserProfile from "./userProfile";
import { useToast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

function Page() {
  const user = useAuthStore((state) => state.user);
  const teamUser = useAuthStore((state) => state.teamUser);
  const setUser = useAuthStore((state) => state.setUser);
  const setTeamUser = useAuthStore((state) => state.setTeamUser);
  const [name, setName] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [updateLoading, setUpdateLoading] = useState<boolean>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { id } = useParams();

  useEffect(() => {
    if (teamUser?.nickname) {
      setName(teamUser.nickname);
    } else if (user?.name) {
      setName(user.name);
    }
  }, [user, teamUser]);

  const isFormValid = () => {
    const formData = { name, profileImage };
    const result = formSchema.safeParse(formData);

    const nameChanged = teamUser
      ? name !== teamUser.nickname
      : name !== user?.name;
    const imageChanged = profileImage !== null;

    return result.success && (nameChanged || imageChanged);
  };

  const handleUpdate = async () => {
    try {
      setUpdateLoading(true);
      const formData = { name, profileImage };
      formSchema.parse(formData);

      const newFormData = new FormData();
      const blob = new Blob(
        [
          JSON.stringify(
            id
              ? {
                  nickname: name,
                }
              : {
                  name: name,
                  phoneNumber: phoneNumber || "",
                }
          ),
        ],
        {
          type: "application/json",
        }
      );

      // Blob을 FormData에 추가
      newFormData.append("data", blob);

      if (profileImage) {
        newFormData.append("image", profileImage);
      }

      const url = id
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/team/${id}/me`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/user/me`;

      const response = await fetchWithAuth(url, {
        method: "PUT",
        body: newFormData,
      });

      if (!response.ok) {
        throw new Error("프로필 업데이트에 실패했습니다.");
      }

      const result = await response.json();

      if (result.responseCode === "SUCCESS") {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        id ? setTeamUser(result.result) : setUser(result.result);
      }

      toast({
        title: "프로필 수정 성공",
        description: "프로필이 성공적으로 수정되었습니다.",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["userData", id] });

      setErrors({});
      router.refresh();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        err.errors.forEach((error) => {
          const field = error.path.join(".");
          fieldErrors[field] = error.message;
        });
        setErrors(fieldErrors);
      }
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="w-[100%] h-[100%] sm:p-[30px] p-[15px] bg-white">
      <div className="md:w-[70%] w-full">
        <h1 className="text-xl font-semibold mb-[40px]">프로필 수정</h1>
        <div className="flex flex-col-reverse md:flex-row w-full justify-between">
          <div className="md:w-[48%] w-full">
            <div className="flex flex-col items-start mb-[30px] font-semibold">
              <span>이름</span>
              <TextInput
                message={"이름을 입력해주세요."}
                width={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <GroupAddError errors={errors.name} />}
            </div>

            <div className="w-full flex justify-between mt-[50px]">
              <div className="hidden md:block"></div>
              <button
                onClick={handleUpdate}
                className={`w-full flex justify-center items-center px-[70px] py-[5px] rounded-md text-white cursor-pointer ${
                  isFormValid()
                    ? "bg-logoColor text-white cursor-pointer"
                    : "bg-disabledColor text-gray-200 cursor-not-allowed"
                }`}
                disabled={updateLoading || !isFormValid()}
              >
                <span>{updateLoading ? "변경중.." : "변경하기"}</span>
              </button>
            </div>
          </div>
          <div className="w-[48%]">
            <UserProfile
              profileImage={profileImage}
              setProfileImage={setProfileImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
