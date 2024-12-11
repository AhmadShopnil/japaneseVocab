import { useState, useEffect } from "react";
import { Tutorial } from "../../types";

const TutorialManagement = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [newTutorial, setNewTutorial] = useState({
    title: "",
    videoId: "",
    description: "",
  });

  useEffect(() => {
    // Fetch tutorials from API

    const fetchTutorials = async () => {
      const response = await fetch("/api/tutorials");
      const data = await response.json();
      setTutorials(data);
    };

    fetchTutorials();
  }, []);

  const handleAddTutorial = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add new tutorial to API

    const response = await fetch("/api/tutorials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTutorial),
    });

    if (response.ok) {
      const addedTutorial = await response.json();
      setTutorials([...tutorials, addedTutorial]);
      setNewTutorial({ title: "", videoId: "", description: "" });
    } else {
      alert("Failed to add tutorial");
    }
  };

  const handleDeleteTutorial = async (tutorialId: string) => {
    if (window.confirm("Are you sure you want to delete this tutorial?")) {
      // Delete tutorial from API

      const response = await fetch(`/api/tutorials/${tutorialId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTutorials(
          tutorials.filter((tutorial) => tutorial.id !== tutorialId)
        );
      } else {
        alert("Failed to delete tutorial");
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tutorial Management</h2>
      <form onSubmit={handleAddTutorial} className="mb-4">
        <input
          type="text"
          value={newTutorial.title}
          onChange={(e) =>
            setNewTutorial({ ...newTutorial, title: e.target.value })
          }
          placeholder="Tutorial Title"
          required
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={newTutorial.videoId}
          onChange={(e) =>
            setNewTutorial({ ...newTutorial, videoId: e.target.value })
          }
          placeholder="YouTube Video ID"
          required
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={newTutorial.description}
          onChange={(e) =>
            setNewTutorial({ ...newTutorial, description: e.target.value })
          }
          placeholder="Description"
          required
          className="border p-2 mr-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Tutorial
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tutorials.map((tutorial) => (
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
            <p className="mb-2">{tutorial.description}</p>
            <button
              onClick={() => handleDeleteTutorial(tutorial.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialManagement;
