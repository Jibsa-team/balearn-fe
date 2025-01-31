import { Skeleton } from "@/components/ui/skeleton";

function MissionSkeleton() {
  return (
    <div className="md:mt-[60px] mt-[15px] p-4">
      <Skeleton className="h-8 w-3/4 mb-4" />
      <div className="space-y-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-grow">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="h-4 w-full max-w-[200px]" />
            </div>
            <Skeleton className="w-12 h-6" />
          </div>
        ))}
      </div>
      <Skeleton className="w-full h-10 mt-4" />
    </div>
  );
}

export default MissionSkeleton;
