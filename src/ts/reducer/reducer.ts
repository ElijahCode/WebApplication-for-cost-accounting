/* eslint-disable no-loop-func */
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
      const newCategory = { ...action.payload };
      if (!newState.categoriesOfCost) {
        newState.categoriesOfCost = [];
      }
      newState.categoriesOfCost.push(newCategory);
    })
    .addCase(addCost, (state, action) => {
      const newState = { ...state };
      const changedCategory = action.payload;
      const changedCategoryIndex = newState.categoriesOfCost.findIndex(
        (category) => changedCategory.name === category.name
      );
      newState.categoriesOfCost[changedCategoryIndex] = changedCategory;

      // let parentCategoryName = changedCategory.parentName ? changedCategory.parentName : null;
      // while(parentCategoryName !== null) {
      //   const parentCategory = {
      //     ...newState.categoriesOfCost.find((category) => category.name === parentCategoryName)
      //   } as IStateCategory
      //   const parentCategoryIndex = newState.categoriesOfCost.findIndex((category) => category.name === parentCategoryName)

      //   const childLastCostItem = changedCategory.costHistory[changedCategory.costHistory.length - 1]

      //   parentCategory.cost += childLastCostItem.cost;
      //   parentCategory.costHistory.push(childLastCostItem);

      //   newState.categoriesOfCost[parentCategoryIndex] = parentCategory;
      //   if(parentCategory.parentName) {
      //     parentCategoryName = parentCategory.parentName;
      //   }
      // }
    });
  // .addCase(deleteCategory, (state, action) => {
  //   const newState = { ...state };
  //   if (action.payload.getParent() && newState.categoriesOfCost) {
  //     const deletedCategory = findCategory(
  //       action.payload.getName(),
  //       ...(newState.categoriesOfCost as Category[])
  //     ) as Category;
  //     const parentCategory = findCategory(
  //       action.payload.getParent().getName(),
  //       ...(newState.categoriesOfCost as Category[])
  //     ) as Category;
  //     parentCategory.removeChild(deletedCategory);
  //   } else {
  //     newState.categoriesOfCost = newState.categoriesOfCost?.filter(
  //       (category) => category.name !== action.payload.getName()
  //     ) as Category[];
  //   }
  // });
});
