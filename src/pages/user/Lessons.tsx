import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TLesson } from "../../interfaces";

const Lessons = () => {
  const [lessons, setLessons] = useState<TLesson[]>([]);

  useEffect(() => {
    // Fetch lessons from API

    const fetchLessons = async () => {
      const response = await fetch("/api/lessons");
      const data = await response.json();
      setLessons(data);
    };

    fetchLessons();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lessons</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            to={`/lessons/${lesson.id}`}
            className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{lesson.name}</h3>
            <p>Lesson Number: {lesson.lessonNumber}</p>
            <p>Vocabulary Count: {lesson.vocabularyCount}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Lessons;
