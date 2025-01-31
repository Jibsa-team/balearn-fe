import React from "react";
import { Skeleton } from "../ui/skeleton";

function TopRankSkeleton() {
  return (
    <div className="w-full flex flex-col mb-8 md:mb-0">
      <Skeleton className="h-8 w-48 mb-4" />
      <div className="flex justify-center items-end gap-4 relative">
        <div className="flex flex-col items-center w-full">
          <Skeleton className="w-10 h-10 rounded-full mb-2" />
          <Skeleton className="w-16 h-4 mb-1" />
          <Skeleton className="w-12 h-4 mb-2" />
          <Skeleton className="w-full h-[100px] md:h-[200px] rounded-t-md" />
        </div>

        <div className="flex flex-col items-center w-full">
          <Skeleton className="w-10 h-10 rounded-full mb-2" />
          <Skeleton className="w-16 h-4 mb-1" />
          <Skeleton className="w-12 h-4 mb-2" />
          <Skeleton className="w-full h-[150px] md:h-[250px] rounded-t-md" />
        </div>

        <div className="flex flex-col items-center w-full">
          <Skeleton className="w-10 h-10 rounded-full mb-2" />
          <Skeleton className="w-16 h-4 mb-1" />
          <Skeleton className="w-12 h-4 mb-2" />
          <Skeleton className="w-full h-[100px] md:h-[200px] rounded-t-md" />
        </div>
      </div>
    </div>
  );
}

export default TopRankSkeleton;
