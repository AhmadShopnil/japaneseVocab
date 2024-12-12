import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { TVocabularyResponse } from "@/interfaces";
import { useGetSingleLessonByIdQuery } from "@/redux/api/lessonApi";
import { Link } from "react-router-dom";

const LessonDetail = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [vocabularies, setVocabularies] = useState<TVocabularyResponse[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const { data: lesson } = useGetSingleLessonByIdQuery(lessonId);

  useEffect(() => {
    if (lesson?.data?.vocabularies) {
      setVocabularies(lesson?.data?.vocabularies);
    }
  }, [lesson, currentIndex]);

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleComplete = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      navigate("/dashboard/user/lessons");
    }, 3000);
  };

  const pronounceWord = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "ja-JP"; // Japanese
    window.speechSynthesis.speak(utterance);
  };

  const currentVocabulary = vocabularies[currentIndex];

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{lesson?.data?.name}</h2>
      <div className="mb-6">
        <Link
          className="bg-black py-2 px-4 text-white"
          to={`/dashboard/user/lessons/`}
        >
          Back to lessons
        </Link>
      </div>
      {vocabularies?.length <= 0 && (
        <div>
          <h3 className="">There are no vocabularies in this lesson.</h3>
        </div>
      )}

      {vocabularies?.length > 0 && (
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">
            {currentVocabulary?.word}
          </h3>
          <p className="mb-2">
            Pronunciation: {currentVocabulary?.pronunciation}
          </p>
          {/* <p className="mb-2">Meaning: {currentVocabulary?.whenToSay}</p> */}
          <p className="mb-4">Usage: {currentVocabulary?.whenToSay}</p>
          <button
            onClick={() => pronounceWord(currentVocabulary?.word)}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          >
            Play
          </button>
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
            >
              Previous
            </button>
            {currentIndex === vocabularies?.length - 1 && (
              <button
                onClick={handleComplete}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Complete Lesson
              </button>
            )}
            {currentIndex !== vocabularies?.length - 1 && (
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}

      {showConfetti && <Confetti />}
    </div>
  );
};

export default LessonDetail;
