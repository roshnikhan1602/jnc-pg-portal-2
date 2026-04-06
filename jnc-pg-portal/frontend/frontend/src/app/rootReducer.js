import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/api/authSlice";

import { authApi } from "@/api/authApi";
import { facultyApi } from "@/api/facultyApi";
import { departmentApi } from "@/api/departmentApi";

const rootReducer = combineReducers({
  auth: authReducer,

  // API reducers
  [authApi.reducerPath]: authApi.reducer,
  [facultyApi.reducerPath]: facultyApi.reducer,
  [departmentApi.reducerPath]: departmentApi.reducer,
});

export default rootReducer;
