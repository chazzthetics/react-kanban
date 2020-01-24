import { createSlice } from "@reduxjs/toolkit";

/**
 * Label Ids Slice
 */
const labelIdsSlice = createSlice({
  name: "labels",
  initialState: ["label1", "label2", "label3", "label4"],
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
  }
});

export const labelIdsReducer = labelIdsSlice.reducer;
