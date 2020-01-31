import { createSlice } from "@reduxjs/toolkit";

/**
 * All Labels Slice
 */
const allLabelsSlice = createSlice({
  name: "labels",
  initialState: {
    label1: {
      id: "label1",
      color: "blue.300",
      name: "work"
    },
    label2: {
      id: "label2",
      color: "green.300",
      name: "personal"
    },
    label3: {
      id: "label3",
      color: "yellow.300",
      name: "vacation"
    },
    label4: {
      id: "label4",
      color: "red.300",
      name: "finances"
    },
    label5: {
      id: "label5",
      color: "purple.200",
      name: "wedding"
    }
  },
  reducers: {
    labelCreated(state, action) {
      const { label } = action.payload;
      state[label.id] = label;
    },
    labelRemoved(state, action) {
      const { labelId } = action.payload;
      delete state[labelId];
    }
  }
});

export const { labelCreated, labelRemoved } = allLabelsSlice.actions;
export const allLabelsReducer = allLabelsSlice.reducer;
