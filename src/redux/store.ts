import { configureStore } from "@reduxjs/toolkit";
import editorSlice from "./editorSlice";

const store = configureStore({
  reducer: {
    editor: editorSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
