/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import TutorialCardMange from "@/components/Admin/TutorialCardMange";
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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-hidden ">
        {tutorials?.data?.map((tutorial: any) => (
          <TutorialCardMange key={tutorial?._id} tutorial={tutorial} />
        ))}
      </div>
    </div>
  );
};

export default TutorialManagement;
