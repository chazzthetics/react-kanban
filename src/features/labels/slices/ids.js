import { createSlice } from "@reduxjs/toolkit";
import { requestSuccess } from "../../shared";

/**
 * Label Ids Slice
 */
const labelIdsSlice = createSlice({
  name: "labels",
  initialState: [],
  reducers: {
    labelCreated(state, action) {
      const { label } = action.payload;
      state.push(label.id);
    },
    labelRemoved(state, action) {
      const { labelId } = action.payload;
      const labelIndex = state.indexOf(labelId);
      if (labelIndex >= 0) {
        state.splice(labelIndex, 1);
      }
    }
  },
  extraReducers: {
    [requestSuccess]: (_state, action) => {
      const { labels } = action.payload;
      return Object.keys(labels);
    }
  }
});

export const labelIdsReducer = labelIdsSlice.reducer;
