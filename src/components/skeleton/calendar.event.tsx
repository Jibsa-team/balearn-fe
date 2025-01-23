import { Skeleton } from "../ui/skeleton";

export default function CalendarEventSkeleton() {
  return (
    <div
      className={`bg-white  rounded-lg w-[300px] z-20 absolute right-0 top-0 h-[100%]
        md:w-[440px] lg:z-10 lg:static`}
    >
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
}
