import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function SettingSkelton() {
  return (
    <div className="w-[95%] p-[30px]">
      <Skeleton className="h-8 w-32 mb-[20px]" />
      <div className="flex flex-wrap gap-[20px]">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-[300px] border-[1px] bg-white px-[20px] py-[30px] rounded-xl shadow-lg"
          >
            <Skeleton className="h-8 w-8 mb-6" />

            <div>
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SettingSkelton;
