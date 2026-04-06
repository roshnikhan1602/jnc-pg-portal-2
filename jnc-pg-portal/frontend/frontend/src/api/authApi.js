import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
  }),
  tagTypes: ["Auth"], // 👈 ADD THIS
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    signupUser: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),

    validateAuth: builder.query({
      query: () => "/auth/validate",
      providesTags: ["Auth"], // 👈 ADD
    }),
        // 🔥 LOGOUT
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"], // 👈 ADD
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useValidateAuthQuery,
  useLogoutUserMutation,
} = authApi;
