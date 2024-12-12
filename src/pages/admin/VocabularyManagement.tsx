/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  useAddVocabularyMutation,
  useDeleteVocabularyMutation,
  useGetAllVocabulariesQuery,
} from "@/redux/api/vocabularyApi";
import { useGetAllLessonsQuery } from "@/redux/api/lessonApi";
import { TLesson, TVocabulary } from "@/interfaces";
import UpadateDataModal from "@/components/Modal/UpadateDataModal";
import UpdateVocabulary from "@/components/Admin/UpdateVocabulary ";
import { selectCurrentUser } from "@/redux/api/slices/authSlice";
import { useAppSelector } from "@/redux/hooks";

const VocabularyManagement = () => {
  const user = useAppSelector(selectCurrentUser);
  const loggedInUserEmail = user?.email;

  const [newVocabulary, setNewVocabulary] = useState<Partial<TVocabulary>>({
    word: "",
    pronunciation: "",
    whenToSay: "",
    lessonNo: "",
    adminEmail: loggedInUserEmail,
  });
  const [selectedVocabulary, setSelectedVocabulary] =
    useState<TVocabulary | null>();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const { data: vocabularies, isLoading: isVocabulariesLoading } =
    useGetAllVocabulariesQuery("");
  const { data: lessons, isLoading: isLessonsLoading } =
    useGetAllLessonsQuery("");

  const [addVocabulary, { isLoading: isAdding }] = useAddVocabularyMutation();
  const [deleteVocabulary, { isLoading: isDeleting }] =
    useDeleteVocabularyMutation();

  const handleAddVocabulary = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addVocabulary(newVocabulary).unwrap();
      setNewVocabulary({
        word: "",
        pronunciation: "",
        whenToSay: "",
        lessonNo: "",
        adminEmail: "",
      });
    } catch (error) {
      console.error("Failed to add vocabulary:", error);
    }
  };

  const handleDeleteVocabulary = async (vocabularyId: string) => {
    if (window.confirm("Are you sure you want to delete this vocabulary?")) {
      try {
        await deleteVocabulary(vocabularyId);
      } catch (error) {
        console.error("Failed to delete vocabulary:", error);
      }
    }
  };

  const handleOpenUpdateModal = (vocabulary: TVocabulary) => {
    setSelectedVocabulary(vocabulary);
    setIsUpdateModalOpen(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Vocabulary Management</h2>
      <form onSubmit={handleAddVocabulary} className="mb-4">
        <input
          type="text"
          value={newVocabulary.word || ""}
          onChange={(e) =>
            setNewVocabulary({ ...newVocabulary, word: e.target.value })
          }
          placeholder="Japanese Word"
          required
          className="border p-2 mr-2  mt-2"
        />
        <input
          type="text"
          value={newVocabulary.pronunciation || ""}
          onChange={(e) =>
            setNewVocabulary({
              ...newVocabulary,
              pronunciation: e.target.value,
            })
          }
          placeholder="Pronunciation"
          required
          className="border p-2 mr-2  mt-2"
        />
        <input
          type="text"
          value={newVocabulary.whenToSay || ""}
          onChange={(e) =>
            setNewVocabulary({ ...newVocabulary, whenToSay: e.target.value })
          }
          placeholder="When to Say"
          required
          className="border p-2 mr-2 mt-2"
        />
        <select
          value={newVocabulary.lessonNo}
          onChange={(e) =>
            setNewVocabulary({ ...newVocabulary, lessonNo: e.target.value })
          }
          required
          className="border p-2 mr-2  mt-2"
        >
          <option value="">Select Lesson</option>
          {lessons?.data?.map((lesson: any) => (
            <option key={lesson.lessonNo} value={lesson.lessonNo}>
              {lesson.lessonNo}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded mt-2 "
        >
          Add Vocabulary
        </button>
      </form>

      {/* Vocabulary Card View */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {vocabularies?.data?.map((vocabulary: any) => (
          <div
            key={vocabulary._id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            <h3 className="text-xl font-semibold">{vocabulary.word}</h3>
            <p className="text-sm text-gray-500">{vocabulary.pronunciation}</p>
            <p className="text-sm text-gray-700">{vocabulary.whenToSay}</p>
            <p className="text-sm text-gray-500">
              Lesson: {vocabulary?.lessonId?.lessonNo}
            </p>
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => handleOpenUpdateModal(vocabulary)}
                className="text-blue-500 hover:underline"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                onClick={() => handleDeleteVocabulary(vocabulary._id)}
                className="ml-2 text-red-500 hover:underline"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Vocabulary Table View (Optional, can be toggled) */}
      <div className="hidden lg:block overflow-x-auto mt-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Japanese Word</th>
              <th className="border p-2">Pronunciation</th>
              <th className="border p-2">When to Say</th>
              <th className="border p-2">Lesson</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vocabularies?.data?.map((vocabulary: any) => (
              <tr key={vocabulary._id} className="border">
                <td className="border p-2">{vocabulary.word}</td>
                <td className="border p-2">{vocabulary.pronunciation}</td>
                <td className="border p-2">{vocabulary.whenToSay}</td>
                <td className="border p-2">{vocabulary?.lessonId?.lessonNo}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleOpenUpdateModal(vocabulary)}
                    className="text-blue-500 hover:underline"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDeleteVocabulary(vocabulary._id)}
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

      {/* Update Vocabulary Modal */}
      {isUpdateModalOpen && selectedVocabulary && (
        <UpadateDataModal onClose={() => setIsUpdateModalOpen(false)}>
          <UpdateVocabulary
            vocabularyId={selectedVocabulary?._id}
            onClose={() => setIsUpdateModalOpen(false)}
          />
        </UpadateDataModal>
      )}
    </div>
  );
};

export default VocabularyManagement;
