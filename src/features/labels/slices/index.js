import { createSlice, combineReducers } from "@reduxjs/toolkit";

const allLabelsSlice = createSlice({
  name: "labels",
  initialState: {
    label1: {
      id: "label1",
      color: "blue",
      name: "work"
    },
    label2: {
      id: "label2",
      color: "green",
      name: "personal"
    },
    label3: {
      id: "label3",
      color: "yellow",
      name: ""
    },
    label4: {
      id: "label4",
      color: "red",
      name: ""
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

const allLabelsReducer = allLabelsSlice.reducer;
export const { labelCreated, labelRemoved } = allLabelsSlice.actions;

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

const labelIdsReducer = labelIdsSlice.reducer;

export default combineReducers({
  all: allLabelsReducer,
  ids: labelIdsReducer
});
