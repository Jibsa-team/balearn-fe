import { Skeleton } from "../ui/skeleton";

export default function WeeklyStudySkeleteon() {
  return (
    <div className="overflow-x-auto mt-4 animate-pulse">
      <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-xl">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-3 w-1/3">
              <Skeleton className="h-4 bg-gray-200 rounded"></Skeleton>
            </th>
            <th className="border border-gray-300 px-4 py-3">
              <Skeleton className="h-4 bg-gray-200 rounded"></Skeleton>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(7)].map((_, i) => (
            <tr key={i}>
              <td className="border border-gray-300 px-4 py-3">
                <Skeleton className="h-4 bg-gray-200 rounded"></Skeleton>
              </td>
              <td className="border border-gray-300 px-4 py-3">
                <Skeleton className="h-4 bg-gray-200 rounded"></Skeleton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
