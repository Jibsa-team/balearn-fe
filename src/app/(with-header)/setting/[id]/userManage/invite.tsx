"use client";

import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { InviteCodeDto } from "@/types/invite/invite";
import { useParams } from "next/navigation";
import React, { useState } from "react";

function UserInvite() {
  const { id } = useParams();
  const [code, setCode] = useState<string>("");
  const handlerInviteCode = async () => {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/team/invite/${id}`
    );

    const result: InviteCodeDto = await response.json();
    const inviteUrl = `${result.result.inviteCode}`;
    setCode(inviteUrl);
  };

  return (
    <>
      <div className="mt-[50px]">
        <h2 className="text-[1.1rem] font-semibold mb-[20px]">초대</h2>
        <div className="mb-[20px]">회원 초대</div>
        <div className="md:w-[50%] w-full flex justify-between items-center">
          <input
            type="text"
            value={code}
            placeholder="code.."
            readOnly
            className="flex-1 border-[1px] border-[rgba(0,0,0,0.1)] rounded-2xl px-[10px] py-[5px]"
          />
          <button
            onClick={handlerInviteCode}
            className="text-[0.9rem] bg-[#2DA44E] text-white px-[20px] py-[5px] rounded-lg ml-[10px]"
          >
            초대 링크
          </button>
        </div>
      </div>
    </>
  );
}

export default UserInvite;
