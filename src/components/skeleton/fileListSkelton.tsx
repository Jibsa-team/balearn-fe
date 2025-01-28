import React from "react";
import { Skeleton } from "../ui/skeleton";

function FileListSkeleton() {
  return (
    <div className="mt-[20px] w-full bg-white">
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-200 md:px-4 md:py-2 px-2 py-1 text-left md:text-[1rem] text-[0.8rem] w-1/4">
              파일 이름
            </th>
            <th className="border border-gray-200 md:px-4 md:py-2 px-2 py-1 text-left md:text-[1rem] text-[0.8rem]">
              파일 크기
            </th>
            <th className="border border-gray-200 md:px-4 md:py-2 px-2 py-1 text-left md:text-[1rem] text-[0.8rem]">
              소유자
            </th>
            <th className="border border-gray-200 md:px-4 md:py-2 px-2 py-1 text-left md:text-[1rem] text-[0.8rem]">
              최근 변경일
            </th>
            <th className="border border-gray-200 md:px-4 md:py-2 px-2 py-1 text-left md:text-[1rem] text-[0.8rem]">
              삭제
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, index) => (
            <tr key={index}>
              <td className="border border-gray-200 md:px-4 md:py-5 px-2 py-4 md:text-[1rem] text-[0.8rem]">
                <div className="flex items-center max-w-full">
                  <Skeleton className="h-6 w-6 mr-[5px]" />
                  <Skeleton className="h-4 w-24 md:w-48" />
                </div>
              </td>
              <td className="border border-gray-200 md:px-4 md:py-2 px-2 py-1">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="border border-gray-200 md:px-4 md:py-2 px-2 py-1">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="border border-gray-200 md:px-4 md:py-2 px-2 py-1">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="border border-gray-200 md:px-4 md:py-2 px-2 py-1">
                <Skeleton className="h-4 w-4" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FileListSkeleton;
