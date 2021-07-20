import { createReducer } from "@reduxjs/toolkit";
import {
  setUserName,
  addCategory,
  addCost,
  deleteCategory,
} from "../actions/actions";
import { findCategory } from "../findCategory/findCategory";
import { Category } from "../categoryClass/Category";

const initState: IState = {
  user: "",
  categoriesOfCost: [],
};

export const reducer = createReducer(initState, (builder) => {
  builder
    .addCase(setUserName, (state, action) => {
      const newState = { ...state };
      newState.user = action.payload;
      return newState;
    })
    .addCase(addCategory, (state, action) => {
      const newState = { ...state };
      if (action.payload.parent && newState.categoriesOfCost) {
        const parentCategory = findCategory(
          action.payload.parent.getName(),
          ...(newState.categoriesOfCost as Category[])
        ) as Category;
        parentCategory.addChilds(action.payload.category);
      } else {
        newState.categoriesOfCost?.push(action.payload.category);
      }
      return newState;
    })
    .addCase(addCost, (state, action) => {
      const newState = { ...state };
      const category = findCategory(
        action.payload.category.name,
        ...(newState.categoriesOfCost as Category[])
      ) as Category;
      category.addCost({
        cost: action.payload.cost,
        date: action.payload.date,
      });
      return newState;
    })
    .addCase(deleteCategory, (state, action) => {
      const newState = { ...state };
      if (action.payload.parent && newState.categoriesOfCost) {
        const deletedCategory = findCategory(
          action.payload.getName(),
          ...(newState.categoriesOfCost as Category[])
        ) as Category;
        const parentCategory = findCategory(
          action.payload.parent.getName(),
          ...(newState.categoriesOfCost as Category[])
        ) as Category;
        parentCategory.removeChild(deletedCategory);
      } else {
        newState.categoriesOfCost = newState.categoriesOfCost?.filter(
          (category) => category.name !== action.payload.getName()
        ) as Category[];
      }
    });
});
