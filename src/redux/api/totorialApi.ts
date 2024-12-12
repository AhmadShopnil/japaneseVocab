// src/redux/api/tutorialApi.ts
import { baseApi } from "./baseApi";

const tutorialApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Add a new tutorial
    addTutorial: build.mutation({
      query: (data) => ({
        url: "/tutorials",
        method: "POST",
        contentType: "application/json",
        body: data,
      }),
      invalidatesTags: ["tutorials"],
    }),

    // Get all tutorials
    getAllTutorials: build.query({
      query: () => ({
        url: "/tutorials",
        method: "GET",
      }),
      providesTags: ["tutorials"],
    }),

    // Get a single tutorial by ID
    getSingleTutorialById: build.query({
      query: (id) => ({
        url: `/tutorials/${id}`,
        method: "GET",
      }),
      providesTags: ["tutorials"],
    }),

    // Delete a tutorial by ID
    deleteTutorial: build.mutation({
      query: (id) => ({
        url: `/tutorials/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tutorials"],
    }),

    // Update a tutorial by ID
    updateTutorial: build.mutation({
      query: (updatedData) => ({
        url: `/tutorials/${updatedData._id}`,
        method: "PUT",
        contentType: "application/json",
        body: updatedData,
      }),
      invalidatesTags: ["tutorials"],
    }),
  }),
});

export const {
  useAddTutorialMutation,
  useDeleteTutorialMutation,
  useGetAllTutorialsQuery,
  useGetSingleTutorialByIdQuery,
  useUpdateTutorialMutation,
} = tutorialApi;
