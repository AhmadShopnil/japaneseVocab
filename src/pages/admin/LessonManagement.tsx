import { useState, useEffect } from "react";
import { Lesson } from "../../types";

const LessonManagement = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [newLesson, setNewLesson] = useState({ name: "", lessonNumber: "" });

  useEffect(() => {
    // Fetch lessons from API

    const fetchLessons = async () => {
      const response = await fetch("/api/lessons");
      const data = await response.json();
      setLessons(data);
    };

    fetchLessons();
  }, []);

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/lessons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLesson),
    });

    if (response.ok) {
      const addedLesson = await response.json();
      setLessons([...lessons, addedLesson]);
      setNewLesson({ name: "", lessonNumber: "" });
    } else {
      alert("Failed to add lesson");
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      // Delete lesson from API
      // This is a placeholder and should be replaced with actual API call
      const response = await fetch(`/api/lessons/${lessonId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setLessons(lessons.filter((lesson) => lesson.id !== lessonId));
      } else {
        alert("Failed to delete lesson");
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lesson Management</h2>
      <form onSubmit={handleAddLesson} className="mb-4">
        <input
          type="text"
          value={newLesson.name}
          onChange={(e) => setNewLesson({ ...newLesson, name: e.target.value })}
          placeholder="Lesson Name"
          required
          className="border p-2 mr-2"
        />
        <input
          type="number"
          value={newLesson.lessonNumber}
          onChange={(e) =>
            setNewLesson({ ...newLesson, lessonNumber: e.target.value })
          }
          placeholder="Lesson Number"
          required
          className="border p-2 mr-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Lesson
        </button>
      </form>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Lesson Name</th>
            <th className="border p-2">Lesson Number</th>
            <th className="border p-2">Vocabulary Count</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson) => (
            <tr key={lesson.id} className="border">
              <td className="border p-2">{lesson.name}</td>
              <td className="border p-2">{lesson.lessonNumber}</td>
              <td className="border p-2">{lesson.vocabularyCount}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDeleteLesson(lesson.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LessonManagement;
