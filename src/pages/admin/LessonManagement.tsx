/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  useAddLessonMutation,
  useDeleteLessonMutation,
  useGetAllLessonsQuery,
} from "@/redux/api/lessonApi";
import { TLesson } from "@/interfaces";
import UpadateDataModal from "@/components/Modal/UpadateDataModal";
import UpdateLesson from "@/components/Admin/UpdateLesson";

const LessonManagement = () => {
  const [newLesson, setNewLesson] = useState({ name: "", lessonNo: "" });
  const [addLesson, { isLoading }] = useAddLessonMutation();
  const [deleteLesson, { isLoading: isDeleting }] = useDeleteLessonMutation();
  const [selectedLesson, setSelectedLesson] = useState<TLesson | null>();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // Get lessons
  const { data: lessons, isLoading: isLessonLoading } =
    useGetAllLessonsQuery("");

  // Handle add a new lesson
  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addLesson(newLesson).unwrap();
    } catch (error: any) {
      console.log("Add lesson error:", error);
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      try {
        await deleteLesson(lessonId);
      } catch (error) {
        console.error("Failed to delete lesson:", error);
      }
    }
  };

  const handleOpenUpdateModal = (lesson: TLesson) => {
    setSelectedLesson(lesson);
    setIsUpdateModalOpen(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lesson Management</h2>

      {/* Add New Lesson Form */}
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
          value={newLesson.lessonNo}
          onChange={(e) =>
            setNewLesson({ ...newLesson, lessonNo: e.target.value })
          }
          placeholder="Lesson Number"
          required
          className="border p-2 mr-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded mt-2 lg:mt-0"
        >
          Add Lesson
        </button>
      </form>

      {/* Table for larger screens */}
      <div className="hidden lg:block">
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
            {lessons?.data?.map((lesson: TLesson) => (
              <tr key={lesson._id} className="border">
                <td className="border p-2">{lesson.name}</td>
                <td className="border p-2">{lesson.lessonNo}</td>
                <td className="border p-2">{lesson?.vocabularies?.length}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleOpenUpdateModal(lesson)}
                    className="text-blue-500 hover:underline"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDeleteLesson(lesson._id)}
                    className="ml-2 text-red-500 hover:underline"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card View for smaller screens */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {lessons?.data?.map((lesson: TLesson) => (
          <div
            key={lesson._id}
            className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {lesson.name}
            </h3>
            <p className="text-gray-600">Lesson No: {lesson.lessonNo}</p>
            <p className="text-gray-600">
              Vocabulary Count: {lesson?.vocabularies?.length}
            </p>

            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleOpenUpdateModal(lesson)}
                className="bg-blue-500 text-white px-3 py-2 rounded"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                onClick={() => handleDeleteLesson(lesson._id)}
                className="bg-red-500 text-white px-3 py-2 rounded"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Lesson Modal */}
      {isUpdateModalOpen && selectedLesson && (
        <UpadateDataModal onClose={() => setIsUpdateModalOpen(false)}>
          <UpdateLesson
            lessonId={selectedLesson._id}
            onClose={() => setIsUpdateModalOpen(false)} // Close modal
          />
        </UpadateDataModal>
      )}
    </div>
  );
};

export default LessonManagement;
