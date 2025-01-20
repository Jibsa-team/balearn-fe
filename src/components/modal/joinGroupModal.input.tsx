"use client";

import * as React from "react";

interface JoinInputProps {
  sidebarModalClose: React.Dispatch<React.SetStateAction<boolean>>;
}

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { GroupJoinDto } from "@/types/group/group";
import { useRouter } from "next/navigation";

export function InputOTPControlled({ sidebarModalClose }: JoinInputProps) {
  const [value, setValue] = React.useState("");
  const router = useRouter();

  const handleJoinGroup = async () => {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/team/join`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inviteCode: value,
        }),
      }
    );

    const result: GroupJoinDto = await response.json();
    console.log(result);
    router.push(`/dashboard/${result.result.teamId}`);
    sidebarModalClose(false);
    console.log(value);
  };

  return (
    <>
      <div className="space-y-2 w-full flex flex-col items-center justify-center">
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
          className="w-full"
        >
          <InputOTPGroup className="w-full flex gap-2">
            <InputOTPSlot index={0} className="border-[1px] border-logoColor" />
            <InputOTPSlot index={1} className="border-[1px] border-logoColor" />
            <InputOTPSlot index={2} className="border-[1px] border-logoColor" />
            <InputOTPSlot index={3} className="border-[1px] border-logoColor" />
            <InputOTPSlot index={4} className="border-[1px] border-logoColor" />
            <InputOTPSlot index={5} className="border-[1px] border-logoColor" />
          </InputOTPGroup>
        </InputOTP>
        <div className="text-center text-sm">코드를 입력해주세요</div>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={handleJoinGroup}
          className="w-full bg-logoColor text-white px-4 py-2 rounded-lg"
        >
          가입하기
        </button>
      </div>
    </>
  );
}
