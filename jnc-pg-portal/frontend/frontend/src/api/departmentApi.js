import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const departmentApi = createApi({
  reducerPath: "departmentApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: () => "/departments",

      // ⭐ return array only (clean)
      transformResponse: (response) => response.departments,
    }),
  }),
});

export const { useGetDepartmentsQuery } = departmentApi;
