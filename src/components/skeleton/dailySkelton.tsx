import { Skeleton } from "../ui/skeleton";

export default function DailySkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}
