import { combineReducers } from "@reduxjs/toolkit";
import { allLabelsReducer, labelCreated, labelRemoved } from "./all";
import { labelIdsReducer } from "./ids";
import { selectAllLabels, selectLabelIds } from "./selectors";

/**
 * Label Selectors
 */
export { selectAllLabels, selectLabelIds };

/**
 * Label Actions
 */
export { labelCreated, labelRemoved };

/**
 * Label Reducers
 */
export default combineReducers({
  all: allLabelsReducer,
  ids: labelIdsReducer
});
