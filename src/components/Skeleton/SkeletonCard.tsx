const SkeletonCard = () => {
  return (
    <div className="bg-gray-200 p-4 rounded shadow animate-pulse">
      <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
      <div className="aspect-w-16 aspect-h-9 bg-gray-300 rounded mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
};

export default SkeletonCard;
