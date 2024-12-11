import { useState, useEffect } from "react";
import { Tutorial } from "../../interfaces";

const Tutorials = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);

  useEffect(() => {
    // Fetch tutorials from API

    const fetchTutorials = async () => {
      const response = await fetch("/api/tutorials");
      const data = await response.json();
      setTutorials(data);
    };

    fetchTutorials();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tutorials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tutorials?.map((tutorial) => (
          <div key={tutorial.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">{tutorial.title}</h3>
            <div className="aspect-w-16 aspect-h-9 mb-2">
              <iframe
                src={`https://www.youtube.com/embed/${tutorial.videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p>{tutorial.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorials;
