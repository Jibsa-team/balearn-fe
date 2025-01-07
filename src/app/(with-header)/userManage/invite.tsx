import React from "react";

function UserInvite() {
  return (
    <div className="mt-[50px]">
      <h2 className="text-[1.1rem] font-semibold mb-[20px]">초대</h2>
      <div className="mb-[20px]">회원 초대</div>
      <div className="w-[50%] flex justify-between items-center">
        <input
          type="text"
          placeholder="code.."
          className="flex-1 border-[1px] border-[rgba(0,0,0,0.1)] rounded-2xl px-[10px] py-[5px]"
        />
        <button className="text-[0.9rem] bg-[#2DA44E] text-white px-[20px] py-[5px] rounded-lg ml-[10px]">
          초대 링크
        </button>
      </div>
    </div>
  );
}

export default UserInvite;
