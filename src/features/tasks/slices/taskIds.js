import { createSlice } from "@reduxjs/toolkit";

const initialData = ["task1", "task2", "task3", "task4", "task5"];

const taskIdsSlice = createSlice({
  name: "tasks",
  initialState: initialData,
  reducers: {}
});

const taskIdsReducer = taskIdsSlice.reducer;
export default taskIdsReducer;
