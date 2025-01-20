import { Skeleton } from "../ui/skeleton";

export default function TeamNotifySkeleton() {
  return (
    <div className="w-full flex items-center gap-4 mb-[15px]">
      <Skeleton className="w-[40px] h-[40px] rounded-full border-2 border-gray-200">
        <Skeleton className="w-full h-full bg-gray-200 rounded-full" />
      </Skeleton>

      <div className="w-full flex gap-2">
        <Skeleton className="w-4/5 h-[20px] bg-gray-200 rounded" />
      </div>
    </div>
  );
}
