/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { InviteCodeDto } from "@/types/invite/invite";
import { useParams } from "next/navigation";
import { IoCopy } from "react-icons/io5";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";

function UserInvite() {
  const { id } = useParams();
  const [code, setCode] = useState<string>("");
  const { toast } = useToast();

  const handlerInviteCode = async () => {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/team/invite/${id}`
    );

    const result: InviteCodeDto = await response.json();
    const inviteUrl = `${result.result.inviteCode}`;
    setCode(inviteUrl);
  };

  const handleCopyClick = async () => {
    if (code) {
      try {
        await navigator.clipboard.writeText(code);
        toast({
          title: "코드 복사",
          description: "코드가 복사되었습니다.",
          variant: "default",
        });
      } catch (err) {
        toast({
          title: "복사 실패",
          description: "코드 복사에 실패했습니다.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <div className="sm:w-[50%] w-full mt-[50px]">
        <h2 className="text-[1.1rem] font-semibold mb-[20px]">초대</h2>
        <div className="mb-[20px] flex justify-between items-center">
          <span>회원 초대</span>

          <button
            onClick={handlerInviteCode}
            className="text-[0.9rem] bg-[#2DA44E] text-white px-[20px] py-[5px] rounded-lg ml-[10px]"
          >
            초대
          </button>
        </div>
        <div className="w-full flex justify-between items-center">
          <input
            type="text"
            value={code}
            placeholder="code.."
            readOnly
            className="flex-1 border-[1px] border-[rgba(0,0,0,0.1)] rounded-2xl px-[10px] py-[5px]"
          />
          <IoCopy
            onClick={handleCopyClick}
            className="sm:text-[1.1rem] text-[1rem] text-[rgba(0,0,0,0.3)] cursor-pointer ml-[10px]"
          />
        </div>
      </div>
    </>
  );
}

export default UserInvite;
