import { baseApi } from "./baseApi";

const lessonApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addLesson: build.mutation({
      query: (data) => {
        return {
          url: "/lessons",
          method: "POST",
          contentType: "application/json",
          body: data,
        };
      },
      invalidatesTags: ["lessons"],
    }),

    getAllLessons: build.query({
      query: () => {
        return {
          url: "/lessons",
          method: "GET",
        };
      },
      providesTags: ["lessons"],
    }),

    getSingleLessonById: build.query({
      query: (id) => {
        return {
          url: `/lessons/${id}`,
          method: "GET",
        };
      },
      providesTags: ["lessons"],
    }),

    deleteLesson: build.mutation({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["lessons"],
    }),

    updateLesson: build.mutation({
      query: (updatedData) => ({
        url: `/lessons/${updatedData?._id}`,
        method: "PUT",
        contentType: "application/json",
        body: updatedData,
      }),
      invalidatesTags: ["lessons", "vocabularies"],
    }),
  }),
});

export const {
  useAddLessonMutation,
  useDeleteLessonMutation,
  useGetAllLessonsQuery,
  useGetSingleLessonByIdQuery,
  useUpdateLessonMutation,
} = lessonApi;
