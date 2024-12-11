import { useState, useEffect } from "react";
import { Vocabulary, Lesson } from "../../types";

const VocabularyManagement = () => {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [newVocabulary, setNewVocabulary] = useState({
    japaneseWord: "",
    pronunciation: "",
    meaning: "",
    usageContext: "",
    lessonId: "",
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // Fetch vocabularies and lessons from API

    const fetchData = async () => {
      const vocabResponse = await fetch("/api/vocabularies");
      const vocabData = await vocabResponse.json();
      setVocabularies(vocabData);

      const lessonResponse = await fetch("/api/lessons");
      const lessonData = await lessonResponse.json();
      setLessons(lessonData);
    };

    fetchData();
  }, []);

  const handleAddVocabulary = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add new vocabulary to API

    const response = await fetch("/api/vocabularies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVocabulary),
    });

    if (response.ok) {
      const addedVocabulary = await response.json();
      setVocabularies([...vocabularies, addedVocabulary]);
      setNewVocabulary({
        japaneseWord: "",
        pronunciation: "",
        meaning: "",
        usageContext: "",
        lessonId: "",
      });
    } else {
      alert("Failed to add vocabulary");
    }
  };

  const handleDeleteVocabulary = async (vocabularyId: string) => {
    if (window.confirm("Are you sure you want to delete this vocabulary?")) {
      // Delete vocabulary from API

      const response = await fetch(`/api/vocabularies/${vocabularyId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setVocabularies(
          vocabularies.filter((vocab) => vocab.id !== vocabularyId)
        );
      } else {
        alert("Failed to delete vocabulary");
      }
    }
  };

  const filteredVocabularies = vocabularies.filter(
    (vocab) => vocab.lessonId.toString() === filter || filter === ""
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Vocabulary Management</h2>
      <form onSubmit={handleAddVocabulary} className="mb-4">
        <input
          type="text"
          value={newVocabulary.japaneseWord}
          onChange={(e) =>
            setNewVocabulary({ ...newVocabulary, japaneseWord: e.target.value })
          }
          placeholder="Japanese Word"
          required
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={newVocabulary.pronunciation}
          onChange={(e) =>
            setNewVocabulary({
              ...newVocabulary,
              pronunciation: e.target.value,
            })
          }
          placeholder="Pronunciation"
          required
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={newVocabulary.meaning}
          onChange={(e) =>
            setNewVocabulary({ ...newVocabulary, meaning: e.target.value })
          }
          placeholder="Meaning"
          required
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={newVocabulary.usageContext}
          onChange={(e) =>
            setNewVocabulary({ ...newVocabulary, usageContext: e.target.value })
          }
          placeholder="Usage Context"
          required
          className="border p-2 mr-2"
        />
        <select
          value={newVocabulary.lessonId}
          onChange={(e) =>
            setNewVocabulary({ ...newVocabulary, lessonId: e.target.value })
          }
          required
          className="border p-2 mr-2"
        >
          <option value="">Select Lesson</option>
          {lessons.map((lesson) => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Vocabulary
        </button>
      </form>
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2">
          Filter by Lesson:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2"
        >
          <option value="">All Lessons</option>
          {lessons.map((lesson) => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.name}
            </option>
          ))}
        </select>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Japanese Word</th>
            <th className="border p-2">Pronunciation</th>
            <th className="border p-2">Meaning</th>
            <th className="border p-2">Usage Context</th>
            <th className="border p-2">Lesson</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVocabularies.map((vocabulary) => (
            <tr key={vocabulary.id} className="border">
              <td className="border p-2">{vocabulary.japaneseWord}</td>
              <td className="border p-2">{vocabulary.pronunciation}</td>
              <td className="border p-2">{vocabulary.meaning}</td>
              <td className="border p-2">{vocabulary.usageContext}</td>
              <td className="border p-2">
                {
                  lessons.find((lesson) => lesson.id === vocabulary.lessonId)
                    ?.name
                }
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleDeleteVocabulary(vocabulary.id)}
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

export default VocabularyManagement;
