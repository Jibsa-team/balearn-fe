import { Skeleton } from "../ui/skeleton";

export default function TeamInfoSkeleton() {
  return (
    <div className="flex items-center">
      <Skeleton className="mr-[10px] rounded-full border-[2.5px] border-gray-200 w-[40px] h-[40px]">
        <Skeleton className="w-full h-full bg-gray-200 rounded-full" />
      </Skeleton>
      <Skeleton className="h-5 bg-gray-200 rounded w-[150px]" />
    </div>
  );
}
