import { Skeleton } from "../ui/skeleton";

export default function NotifySkeleton() {
  return (
    <div className="flex items-center space-x-4 mb-[50px]">
      <div className="space-y-2 w-full">
        <Skeleton className="h-[50px] w-1/3 rounded-full" />
      </div>
    </div>
  );
}
