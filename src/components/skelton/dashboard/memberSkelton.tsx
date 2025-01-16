export default function MemberSkeleton() {
  return (
    <div className="flex flex-col items-center mr-[10px] animate-pulse">
      <div className="rounded-full p-[5px] border-[2.5px] border-gray-200 w-[120px] h-[120px]">
        <div className="w-full h-full bg-gray-200 rounded-full" />
      </div>
      <div className="mt-4 h-5 bg-gray-200 rounded w-24" />
    </div>
  );
}
