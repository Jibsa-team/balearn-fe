"use client";

import TextInput from "@/components/group/input/textInput";
import React, { useState } from "react";
import { z } from "zod";
import GroupAddError from "@/components/error/ErrorMessage";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";

import useAuthStore from "@/store/useAuthStore";
import { formSchema } from "./schema";
import UserProfile from "./userProfile";

function Page() {
  const user = useAuthStore((state) => state.user);
  const [userName, setUserName] = useState(user?.name || "");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const isFormValid = () => {
    const formData = { userName, profileImage };
    const result = formSchema.safeParse(formData);
    return result.success && profileImage !== null;
  };

  const handleCreate = async () => {
    try {
      const formData = {
        userName,
        profileImage,
      };
      formSchema.parse(formData);
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_BASE_URL}/group/create`,
        {
          method: "POST",
        }
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = await response.json();
      // console.log(result);

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
    <div className="w-[100%] h-[100%] p-[30px] bg-white">
      <h1 className="text-xl font-semibold mb-[40px]">프로필 수정</h1>
      <div className="flex w-full justify-between">
        <div className="w-[48%]">
          <div className="flex flex-col items-start mb-[30px] font-semibold">
            <span>이름</span>
            <TextInput
              message={"이름을 입력해주세요."}
              width={100}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            {errors.userName && <GroupAddError errors={errors.userName} />}
          </div>

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
              변경하기
            </div>
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
  );
}

export default Page;
