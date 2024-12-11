import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Confetti from "react-confetti";
import { Vocabulary } from "../interfaces";

const LessonDetail = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Fetch vocabularies for the lesson from API

    const fetchVocabularies = async () => {
      const response = await fetch(`/api/lessons/${lessonId}/vocabularies`);
      const data = await response.json();
      setVocabularies(data);
    };

    fetchVocabularies();
  }, [lessonId]);

  const handleNext = () => {
    if (currentIndex < vocabularies.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        navigate("/lessons");
      }, 3000);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentVocabulary = vocabularies[currentIndex];

  if (!currentVocabulary) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Lesson {lessonId}</h2>
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">
          {currentVocabulary.japaneseWord}
        </h3>
        <p className="mb-2">Pronunciation: {currentVocabulary.pronunciation}</p>
        <p className="mb-2">Meaning: {currentVocabulary.meaning}</p>
        <p className="mb-4">Usage: {currentVocabulary.usageContext}</p>
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {currentIndex === vocabularies.length - 1
              ? "Complete Lesson"
              : "Next"}
          </button>
        </div>
      </div>
      {showConfetti && <Confetti />}
    </div>
  );
};

export default LessonDetail;
