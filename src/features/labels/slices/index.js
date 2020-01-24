import { combineReducers } from "@reduxjs/toolkit";
import { allLabelsReducer, labelCreated, labelRemoved } from "./all";
import { labelIdsReducer } from "./ids";

/**
 * Label Reducers
 */
export default combineReducers({
  all: allLabelsReducer,
  ids: labelIdsReducer
});

/**
 * Label Actions
 */
export { labelCreated, labelRemoved };
