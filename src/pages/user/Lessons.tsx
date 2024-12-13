import { Link } from "react-router-dom";
import { TLesson } from "../../interfaces";
import { useGetAllLessonsQuery } from "@/redux/api/lessonApi";
import { SkeletonItemCard } from "@/components/Skeleton/SkeletonItemCard";

const Lessons = () => {
  // get all lessons
  const { data: lessons, isLoading, isError } = useGetAllLessonsQuery("");

  if (isLoading) {
    return (
      <div className="">
        <SkeletonItemCard />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Failed to load users. Please try again later.
      </p>
    );
  }

  if (lessons?.data?.length == 0) {
    return <p className="text-center text-gray-600">No users found.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lessons</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons?.data?.map((lesson: TLesson) => (
          <Link
            key={lesson._id}
            to={`/dashboard/user/lessons/${lesson._id}`}
            className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{lesson.name}</h3>
            <p>Lesson Number: {lesson.lessonNo}</p>
            {/* <p>Vocabulary Count: {lesson.vocabularyCount}</p> */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Lessons;
