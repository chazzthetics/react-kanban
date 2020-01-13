import { createSlice } from "@reduxjs/toolkit";

const initialData = {
  column1: {
    id: "column1",
    title: "COLUMN 1",
    taskIds: ["task1", "task2"],
    isEditing: false
  },
  column2: {
    id: "column2",
    title: "COLUMN 2",
    taskIds: ["task3", "task4"],
    isEditing: false
  },
  column3: {
    id: "column3",
    title: "COLUMN 3",
    taskIds: [],
    isEditing: false
  },
  column4: {
    id: "column4",
    title: "COLUMN 4",
    taskIds: ["task5"],
    isEditing: false
  }
};

const allColumnsSlice = createSlice({
  name: "columns",
  initialState: initialData,
  reducers: {}
});

const allColumnsReducer = allColumnsSlice.reducer;
export default allColumnsReducer;
