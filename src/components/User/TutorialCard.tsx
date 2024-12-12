/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const TutorialCard = ({ tutorial }: any) => {
  return (
    <div className="bg-white p-6 rounded shadow hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        {tutorial.title}
      </h3>
      <div className="relative w-full pb-[56.25%] mb-4 rounded overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${tutorial.videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
      {tutorial.otherResource && (
        <p className="text-gray-600 text-sm">
          <strong>Other Resource:</strong> {tutorial.otherResource}
        </p>
      )}
    </div>
  );
};

export default TutorialCard;
