import { createSelector } from "@reduxjs/toolkit";

export const getAuthState = createSelector([state => state.auth], auth => auth);

export const selectUser = createSelector([getAuthState], auth => auth.user);
