/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  useAddTutorialMutation,
  useDeleteTutorialMutation,
  useGetAllTutorialsQuery,
} from "@/redux/api/totorialApi";
import { useState } from "react";

const TutorialManagement = () => {
  const {
    data: tutorials = [],
    isLoading,
    isError,
  } = useGetAllTutorialsQuery("");
  const [addTutorial, { isLoading: isAdding }] = useAddTutorialMutation();
  const [deleteTutorial] = useDeleteTutorialMutation();
  const [newTutorial, setNewTutorial] = useState({
    title: "",
    videoId: "",
    otherResource: "",
  });

  const handleAddTutorial = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addTutorial(newTutorial).unwrap();
      // Automatically update the tutorial list after adding the new tutorial
      setNewTutorial({ title: "", videoId: "", otherResource: "" });
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDeleteTutorial = async (tutorialId: string) => {
    if (window.confirm("Are you sure you want to delete this tutorial?")) {
      try {
        await deleteTutorial(tutorialId).unwrap();
      } catch (error: any) {
        console.log(error);
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
          value={newTutorial.otherResource}
          onChange={(e) =>
            setNewTutorial({ ...newTutorial, otherResource: e.target.value })
          }
          placeholder="Other Resource"
          className="border p-2 mr-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={isAdding}
        >
          {isAdding ? "Adding..." : "Add Tutorial"}
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden ">
        {tutorials?.data?.map((tutorial: any) => (
          <div key={tutorial._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">{tutorial?.title}</h3>
            <div className="aspect-w-16 aspect-h-9 mb-2">
              <iframe
                src={`https://www.youtube.com/embed/${tutorial?.videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="mb-2">{tutorial?.otherResource}</p>
            <button
              onClick={() => handleDeleteTutorial(tutorial._id)}
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
