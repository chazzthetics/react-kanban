import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { cascadeOnDelete } from "./middlewares/cascadeOnDelete";
import { transformRequest } from "./middlewares/transformRequest";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), transformRequest, cascadeOnDelete]
});

export default store;
