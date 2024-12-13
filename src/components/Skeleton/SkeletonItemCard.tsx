export const SkeletonItemCard = () => {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 animate-pulse"
        >
          <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded mb-3 w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded mb-4 w-1/2"></div>
          <div className="h-8 bg-gray-300 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
};
