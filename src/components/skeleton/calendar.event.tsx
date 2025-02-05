import { Skeleton } from "../ui/skeleton";

export default function CalendarEventSkeleton() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 z-20 absolute right-0 top-0 h-[100%] md:w-[400px] w-[85%] lg:z-10 lg:static">
      <div className="w-full mb-[20px]">
        <Skeleton className="h-[24px] w-1/2 mb-4" />
        <div className="mb-[20px]">
          <Skeleton className="h-[20px] w-1/3 mb-2" />
          <Skeleton className="h-[40px] w-full" />
        </div>

        <div className="mb-[20px]">
          <Skeleton className="h-[20px] w-1/3 mb-2" />
          <Skeleton className="h-[40px] w-full" />
          <Skeleton className="h-[40px] w-full mt-2" />
        </div>

        <div className="mb-[20px]">
          <Skeleton className="h-[20px] w-1/3 mb-2" />
          <div className="flex justify-between">
            <Skeleton className="h-[40px] w-[45%]" />
            <Skeleton className="h-[40px] w-[45%]" />
          </div>
        </div>

        <Skeleton className="h-[40px] w-full mt-[30px]" />
        <Skeleton className="h-[40px] w-full mt-[10px]" />
      </div>
    </div>
  );
}
