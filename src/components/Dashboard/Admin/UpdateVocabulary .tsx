import {
  useGetSingleVocabularyByIdQuery,
  useUpdateVocabularyMutation,
} from "@/redux/api/vocabularyApi";
import React, { useState, useEffect } from "react";

interface UpdateVocabularyProps {
  vocabularyId: string;
  onClose: () => void;
}

const UpdateVocabulary = ({ vocabularyId, onClose }: UpdateVocabularyProps) => {
  const { data: vocabulary, isLoading: isVocabularyLoading } =
    useGetSingleVocabularyByIdQuery(vocabularyId);
  const [updateVocabulary, { isLoading: isUpdating }] =
    useUpdateVocabularyMutation();

  const [formData, setFormData] = useState<{
    word: string;
    pronunciation: string;
    whenToSay: string;
    lessonNo?: number;
    lessonId?: string;
  }>({
    word: "",
    pronunciation: "",
    whenToSay: "",
    lessonNo: undefined,
    lessonId: undefined,
  });

  useEffect(() => {
    if (vocabulary) {
      setFormData({
        word: vocabulary?.data.word || "",
        pronunciation: vocabulary?.data?.pronunciation || "",
        whenToSay: vocabulary?.data?.whenToSay || "",
        // lessonNo: vocabulary?.data?.lessonNo,
        lessonNo: vocabulary?.data?.lessonId?.lessonNo,
        lessonId: vocabulary?.data?.lessonId || "",
      });
    }
  }, [vocabulary]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "lessonNo" ? parseInt(value) : value.trim(),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateVocabulary({ ...formData, _id: vocabularyId });
      onClose();
    } catch (error) {
      console.error("Failed to update vocabulary", error);
      alert("Error updating vocabulary. Please try again.");
    }
  };

  if (isVocabularyLoading) return <p>Loading vocabulary details...</p>;

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Update Vocabulary</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="word"
            className="block text-gray-700 font-medium mb-2"
          >
            Word
          </label>
          <input
            type="text"
            id="word"
            name="word"
            value={formData.word}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="pronunciation"
            className="block text-gray-700 font-medium mb-2"
          >
            Pronunciation
          </label>
          <input
            type="text"
            id="pronunciation"
            name="pronunciation"
            value={formData.pronunciation}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="whenToSay"
            className="block text-gray-700 font-medium mb-2"
          >
            When to Say
          </label>
          <input
            type="text"
            id="whenToSay"
            name="whenToSay"
            value={formData.whenToSay}
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
            value={formData.lessonNo || ""}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {/* <div className="mb-4">
          <label
            htmlFor="lessonId"
            className="block text-gray-700 font-medium mb-2"
          >
            Lesson ID
          </label>
          <input
            type="text"
            id="lessonId"
            name="lessonId"
            value={formData.lessonId || ""}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div> */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Vocabulary"}
        </button>
      </form>
    </div>
  );
};

export default UpdateVocabulary;
