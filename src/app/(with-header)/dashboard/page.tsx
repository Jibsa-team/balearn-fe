"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-full p-[30px] bg-white shadow-md overflow-y-scroll">
      <button
        onClick={() => router.push("/group")}
        className="bg-logoColor p-[10px] text-white"
      >
        모임을 생성해주세요
      </button>
    </div>
  );
}
