import { useParams, useRouter } from "next/navigation";

import React from "react";

function NoMisson() {
  const router = useRouter();
  const { id } = useParams();
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg border border-gray-200 text-center">
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        오늘 등록된 일정이 없어요
      </h3>
      <p className="text-gray-500 mb-4">새로운 일정을 추가해보세요!</p>
      <button
        onClick={() => router.push(`/calendars/${id}`)}
        className="px-4 py-2 bg-gray-300 text-white rounded-md hover:bg-gray-400 transition-colors"
      >
        일정 추가하기
      </button>
    </div>
  );
}

export default NoMisson;
