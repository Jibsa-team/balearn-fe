import React from "react";
import UserAuthority from "./ authority";
import UserInvite from "./invite";

function Page() {
  return (
    <div className="w-[95%] h-[100%] p-[30px] bg-white">
      <h1 className="text-[1.3rem] font-semibold mb-[20px]">회원 관리</h1>
      <div className="border-[1px] border-gray-200 mb-[20px]"></div>
      <UserAuthority />
      <UserInvite />
    </div>
  );
}

export default Page;
