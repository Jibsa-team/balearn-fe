import { Skeleton } from "../ui/skeleton";

export default function MemberSkeleton() {
  return (
    <div className="flex flex-col items-center mr-[10px] animate-pulse">
      <Skeleton className="rounded-full p-[5px] border-[2.5px] border-gray-200 w-[120px] h-[120px]">
        <Skeleton className="w-full h-full bg-gray-200 rounded-full" />
      </Skeleton>
      <Skeleton className="mt-4 h-5 bg-gray-200 rounded w-24" />
    </div>
  );
}
