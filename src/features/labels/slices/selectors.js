import { createSelector } from "@reduxjs/toolkit";

const getLabelState = createSelector([state => state.labels], labels => labels);

export const selectLabelIds = createSelector(
  [getLabelState],
  labels => labels.ids
);

export const selectAllLabels = createSelector(
  [getLabelState],
  labels => labels.all
);
