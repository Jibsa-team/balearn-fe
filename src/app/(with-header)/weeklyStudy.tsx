import React from "react";

function WeeklyStudy() {
  return (
    <div className="mt-[80px] mb-[20px]">
      <h1 className="text-2xl font-semibold text-gray-700">Weekly Study</h1>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-xl">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">요일</th>
              <th className="border border-gray-300 px-4 py-2">주제</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">월요일</td>
              <td className="border border-gray-300 px-4 py-2">
                알고리즘 문제 풀이
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">화요일</td>
              <td className="border border-gray-300 px-4 py-2">
                React 기초 학습
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">수요일</td>
              <td className="border border-gray-300 px-4 py-2">백엔드 연습</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">목요일</td>
              <td className="border border-gray-300 px-4 py-2">UI/UX 디자인</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">금요일</td>
              <td className="border border-gray-300 px-4 py-2">
                프로젝트 코드 리뷰
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">토요일</td>
              <td className="border border-gray-300 px-4 py-2">팀 미팅</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">일요일</td>
              <td className="border border-gray-300 px-4 py-2">휴식</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WeeklyStudy;
