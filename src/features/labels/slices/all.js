import { createSlice } from "@reduxjs/toolkit";
import { requestSuccess } from "../../shared";

/**
 * All Labels Slice
 */
const allLabelsSlice = createSlice({
  name: "labels",
  initialState: {},
  reducers: {
    labelCreated(state, action) {
      const { label } = action.payload;
      state[label.id] = label;
    },
    labelRemoved(state, action) {
      const { labelId } = action.payload;
      delete state[labelId];
    }
  },
  extraReducers: {
    [requestSuccess]: (_state, action) => {
      const { labels } = action.payload;
      return labels;
    }
  }
});

export const { labelCreated, labelRemoved } = allLabelsSlice.actions;
export const allLabelsReducer = allLabelsSlice.reducer;
