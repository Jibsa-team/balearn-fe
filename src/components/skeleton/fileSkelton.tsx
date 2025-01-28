import React from "react";
import { Skeleton } from "../ui/skeleton";

function FileSkelton() {
  return (
    <tr>
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
  );
}

export default FileSkelton;
