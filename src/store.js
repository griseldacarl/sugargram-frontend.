import { configureStore } from "@reduxjs/toolkit";
import { databaseApi } from "./features/api/databaseApi";
import currentUserReducer from "./features/currentUser/currentUserSlice";

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    [databaseApi.reducerPath]: databaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(databaseApi.middleware),
});
