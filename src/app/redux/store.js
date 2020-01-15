import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { cascadeOnDelete } from "./middlewares/cascadeOnDelete";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), cascadeOnDelete]
});

export default store;
