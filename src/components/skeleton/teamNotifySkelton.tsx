import { Skeleton } from "../ui/skeleton";

export default function TeamNotifySkeleton({ count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-start border-b-[1px] border-gray-200 mb-[50px] pb-[10px]"
        >
          <Skeleton className="w-[200px] h-[24px] bg-gray-100 rounded-md mb-[10px]" />
          <div className="w-full flex justify-between items-center">
            <div className="w-full flex items-center">
              <div className="w-[30%] flex items-center gap-4 mb-4 md:mr-[20px]">
                <Skeleton className="w-[30px] h-[30px] rounded-full" />
                <Skeleton className="w-[100px] h-[20px] bg-gray-100 rounded" />
              </div>
              <div className="w-full">
                <Skeleton className="w-4/5 h-[20px] bg-gray-100 rounded" />
              </div>
            </div>
            <Skeleton className="w-[20px] h-[20px] bg-gray-100 rounded-full" />
          </div>
        </div>
      ))}
    </>
  );
}
