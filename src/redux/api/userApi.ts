import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (data) => {
        return {
          url: "/auth/signup",
          method: "POST",
          contentType: "application/json",
          body: data,
        };
      },
    }),

    login: build.mutation({
      query: (data) => {
        return {
          url: "/auth/login",
          method: "POST",
          contentType: "application/json",
          body: data,
        };
      },
      invalidatesTags: ["profile"],
    }),

    getAllUsers: build.query({
      query: () => {
        return {
          url: `/users`,
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),
    getMyProfile: build.query({
      query: () => {
        return {
          url: `/auth/me`,
          method: "GET",
        };
      },
      providesTags: ["profile"],
    }),
    changeUserRole: build.mutation({
      query: (data) => {
        return {
          url: `/users/changeRole/${data?.userId}`,
          method: "PUT",
          contentType: "application/json",
          body: data,
        };
      },
      invalidatesTags: ["users"],
    }),
    //
    deleteSingleUser: build.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: `/users/me`,
        method: "Put",
        contentType: "application/json",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
    //
  }),
});

export const {
  useGetMyProfileQuery,
  useGetAllUsersQuery,
  useLoginMutation,
  useSignUpMutation,
  useChangeUserRoleMutation,
  useDeleteSingleUserMutation,
  useUpdateProfileMutation,
} = userApi;
