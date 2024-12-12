/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import TutorialCard from "@/components/User/TutorialCard";
import { useGetAllTutorialsQuery } from "@/redux/api/totorialApi";

const Tutorials = () => {
  const {
    data: tutorials = [],
    isLoading,
    isError,
  } = useGetAllTutorialsQuery("");

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Tutorials</h2>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      )}

      {isError && (
        <p className="text-red-500 text-center">
          Failed to load tutorials. Please try again later.
        </p>
      )}

      {!isLoading && tutorials?.data?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.data.map((tutorial: any) => (
            <TutorialCard key={tutorial._id} tutorial={tutorial} />
          ))}
        </div>
      )}

      {!isLoading && tutorials?.data?.length === 0 && (
        <p className="text-center text-gray-600">No tutorials available.</p>
      )}
    </div>
  );
};

export default Tutorials;
