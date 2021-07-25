import { createAction } from "@reduxjs/toolkit";

export const setUserName = createAction<string>("username/set");

export const addCategory = createAction<IStateCategory>("category/add");
export const changeCategoryName = createAction<IActionChangeCategoryName>(
  "category/change\name"
);
export const deleteCategory = createAction<IStateCategory>("category/delete");

export const addCost = createAction<IActionAddCost>("cost/add");
export const changeCost = createAction<CostHistoryItem>("cost/change");
export const deleteCost = createAction<CostHistoryItem>("cost/delete");
