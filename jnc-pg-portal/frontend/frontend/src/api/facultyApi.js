import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const facultyApi = createApi({
  reducerPath: "facultyApi",

  baseQuery: fetchBaseQuery({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    credentials: "include",
  }),

  tagTypes: ["Faculty"],

  endpoints: (builder) => ({

    /* ================= PUBLIC ================= */
    getFaculties: builder.query({
      query: () => "/faculty",
      transformResponse: (response) => response.faculties || [],
      providesTags: ["Faculty"],
    }),

    getFacultyById: builder.query({
      query: (id) => `/faculty/${id}`,
      transformResponse: (response) => response.faculty || {},
      providesTags: ["Faculty"],
    }),

    /* ================= ADMIN ================= */
    addFaculty: builder.mutation({
      query: (formData) => ({
        url: "/faculty/admin/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Faculty"],
    }),

    updateFaculty: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/faculty/admin/update/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Faculty"],
    }),

    deleteFaculty: builder.mutation({
      query: (id) => ({
        url: `/faculty/admin/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Faculty"],
    }),

    /* ================= FACULTY SELF ================= */
    getMyProfile: builder.query({
      query: () => "/faculty/me/profile",
      transformResponse: (response) => response || {},
      providesTags: ["Faculty"],
    }),

    // 🔥 FINAL FIX HERE
    updateMyProfile: builder.mutation({
      query: (data) => ({
        url: "/faculty/me/profile",
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Faculty"],
    }),

  }),
});

export const {
  useGetFacultiesQuery,
  useGetFacultyByIdQuery,
  useAddFacultyMutation,
  useUpdateFacultyMutation,
  useDeleteFacultyMutation,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} = facultyApi;