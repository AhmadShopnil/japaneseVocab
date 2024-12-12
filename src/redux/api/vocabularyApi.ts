import { baseApi } from "./baseApi";

const vocabularyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addVocabulary: build.mutation({
      query: (data) => {
        return {
          url: "/vocabularies",
          method: "POST",
          contentType: "application/json",
          body: data,
        };
      },
      invalidatesTags: ["vocabularies"],
    }),

    getAllVocabularies: build.query({
      query: () => {
        return {
          url: "/vocabularies",
          method: "GET",
        };
      },
      providesTags: ["vocabularies"],
    }),

    getSingleVocabularyById: build.query({
      query: (id) => {
        return {
          url: `/vocabularies/${id}`,
          method: "GET",
        };
      },
      providesTags: ["vocabularies"],
    }),

    deleteVocabulary: build.mutation({
      query: (id) => ({
        url: `/vocabularies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["vocabularies"],
    }),

    updateVocabulary: build.mutation({
      query: (updatedData) => ({
        url: `/vocabularies/${updatedData?._id}`,
        method: "PUT",
        contentType: "application/json",
        body: updatedData,
      }),
      invalidatesTags: ["vocabularies"],
    }),
  }),
});

export const {
  useAddVocabularyMutation,
  useDeleteVocabularyMutation,
  useGetAllVocabulariesQuery,
  useGetSingleVocabularyByIdQuery,
  useUpdateVocabularyMutation,
} = vocabularyApi;
