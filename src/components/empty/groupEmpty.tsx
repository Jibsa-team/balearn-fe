"use client";

import { useRouter } from "next/navigation";
import GroupLottie from "../lottie/groupEmpty";

export default function GroupEmpty() {
  const router = useRouter();
  return (
    <div className="w-full sm:p-[30px] p-[15px] bg-white shadow-md overflow-y-scroll flex flex-col justify-center items-center">
      <GroupLottie />
      <button
        onClick={() => router.push("/setting/group-create")}
        className="bg-logoColor p-[10px] text-white rounded-lg"
      >
        모임을 먼저 생성해주세요
      </button>
    </div>
  );
}
