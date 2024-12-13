export const SkeletonTable = () => {
  return (
    <div className="hidden lg:block">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2"></th>
            <th className="border p-2"></th>
            <th className="border p-2"></th>
            <th className="border p-2"></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, idx) => (
            <tr key={idx} className="border animate-pulse">
              <td className="border p-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </td>
              <td className="border p-2">
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </td>
              <td className="border p-2">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              </td>
              <td className="border p-2">
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
