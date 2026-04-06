import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

// APIs
import { authApi } from "@/api/authApi";
import { facultyApi } from "@/api/facultyApi";
import { departmentApi } from "@/api/departmentApi";

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      facultyApi.middleware,
      departmentApi.middleware
    ),
});
