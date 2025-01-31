import React from "react";
import { Skeleton } from "../ui/skeleton";

function RankListSkeleton() {
  return (
    <div className="mt-[30px] md:mt-[0px] w-full md:w-1/2 flex flex-col">
      <table className="w-full rounded-lg overflow-hidden">
        <thead className="bg-gray-100 font-semibold">
          <tr className="text-lg font-semibold">
            <th className="p-4 text-center w-[20%]">순위</th>
            <th className="p-4 text-left w-[40%]">사용자</th>
            <th className="p-4 text-center w-[40%]">포인트</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((item) => (
            <tr key={item} className="border-b border-gray-200">
              <td className="p-4 text-center font-medium">
                <div className="flex items-center justify-center">
                  <Skeleton className="h-6 w-6 mr-2" />
                  <Skeleton className="h-6 w-6" />
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-[30px] h-[30px] rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </td>
              <td className="p-4 text-center">
                <Skeleton className="h-4 w-16 mx-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RankListSkeleton;
