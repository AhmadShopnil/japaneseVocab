import {
  useGetSingleLessonByIdQuery,
  useUpdateLessonMutation,
} from "@/redux/api/lessonApi";
import React, { useState, useEffect } from "react";

interface UpdateLessonProps {
  lessonId: string;
  onClose: () => void;
}

const UpdateLesson = ({ lessonId, onClose }: UpdateLessonProps) => {
  const { data: lesson, isLoading: isLessonLoading } =
    useGetSingleLessonByIdQuery(lessonId);
  const [updateLesson, { isLoading: isUpdating }] = useUpdateLessonMutation();

  const [formData, setFormData] = useState({
    name: "",
    lessonNo: 0,
  });

  useEffect(() => {
    if (lesson) {
      setFormData({
        name: lesson?.data.name || "",
        lessonNo: lesson?.data?.lessonNo || 0,
      });
    }
  }, [lesson]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "lessonNo" ? parseInt(value) : value, // Convert lessonNo to number
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateLesson({ ...formData, _id: lessonId });

      onClose();
    } catch (error) {
      console.error("Failed to update lesson", error);
      alert("Error updating lesson. Please try again.");
    }
  };

  if (isLessonLoading) return <p>Loading lesson details...</p>;

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Update Lesson</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lessonNo"
            className="block text-gray-700 font-medium mb-2"
          >
            Lesson Number
          </label>
          <input
            type="number"
            id="lessonNo"
            name="lessonNo"
            value={formData.lessonNo}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Lesson"}
        </button>
      </form>
    </div>
  );
};

export default UpdateLesson;
