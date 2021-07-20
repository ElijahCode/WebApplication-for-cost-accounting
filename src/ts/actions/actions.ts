import { createAction } from "@reduxjs/toolkit";

export const setUserName = createAction<string>("username/set");

export const addCategory =
  createAction<ActionsAddCategoryPayload>("category/add");
export const deleteCategory = createAction<ICategory>("category/delete");

export const addCost = createAction<ActionsAddCostPayload>("cost/add");
