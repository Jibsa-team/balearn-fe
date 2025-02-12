import { Skeleton } from "../ui/skeleton";

export default function MemberSkeleton() {
  return (
    <div className="flex flex-col items-center mr-[10px] animate-pulse">
      <Skeleton className="rounded-full p-[5px] border-[2.5px] border-gray-200 sm:w-[110px] w-[90px] sm:h-[110px] h-[90px]">
        <Skeleton className="w-full h-full bg-gray-200 rounded-full" />
      </Skeleton>
      <Skeleton className="mt-4 h-5 bg-gray-100 rounded w-24" />
    </div>
  );
}
