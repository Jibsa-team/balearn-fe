export default function WeeklyStudySkeleteon() {
  return (
    <div className="overflow-x-auto mt-4 animate-pulse">
      <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-xl">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-3 w-1/3">
              <div className="h-4 bg-gray-200 rounded"></div>
            </th>
            <th className="border border-gray-300 px-4 py-3">
              <div className="h-4 bg-gray-200 rounded"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(7)].map((_, i) => (
            <tr key={i}>
              <td className="border border-gray-300 px-4 py-3">
                <div className="h-4 bg-gray-200 rounded"></div>
              </td>
              <td className="border border-gray-300 px-4 py-3">
                <div className="h-4 bg-gray-200 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
