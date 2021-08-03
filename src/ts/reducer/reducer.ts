/* eslint-disable no-param-reassign */
import { createReducer } from "@reduxjs/toolkit";
import {
  setAllState,
  setUserName,
  addCategory,
  addCost,
  deleteCategory,
  changeCost,
  deleteCost,
  changeCategoryName,
} from "./actions";

const initState: IState = {
  user: "",
  categoriesOfCost: [],
};

export const reducer = createReducer(initState, (builder) => {
  builder
    .addCase(setAllState, (state, action) => action.payload)
    .addCase(setUserName, (state, action) => {
      const newState = { ...state };
      newState.user = action.payload;
      return newState;
    })
    .addCase(addCategory, (state, action) => {
      const newState = { ...state };
      const category = {
        ...action.payload,
      };

      if (category.parentID !== null) {
        const parentCategory = newState.categoriesOfCost.filter(
          (el) => el.id === category.parentID
        )[0];
        parentCategory.childs = parentCategory.childs.concat(`${category.id} `);
      }
      newState.categoriesOfCost.push(category);
    })
    .addCase(changeCategoryName, (state, action) => {
      const newState = { ...state };
      const changedCategory = newState.categoriesOfCost.find(
        (category) => category.id === action.payload.category.id
      ) as IStateCategory;
      changedCategory.name = action.payload.newName;
    })
    .addCase(deleteCategory, (state, action) => {
      const newState = { ...state };
      const category = newState.categoriesOfCost.find(
        (categ) => categ.id === action.payload.id
      ) as IStateCategory;
      let newCategoriesOfCost = newState.categoriesOfCost.filter(
        (categ) => categ.id !== category.id
      );

      function deleteFromParentsCost(parentID: string): void {
        const parentCategory = newCategoriesOfCost.find(
          (categ) => categ.id === parentID
        ) as IStateCategory;
        parentCategory.cost -= category.cost;
        parentCategory.costHistory = parentCategory.costHistory.filter(
          (item) => {
            let flag = false;
            category.costHistory.forEach((el) => {
              if (JSON.stringify(item) !== JSON.stringify(el)) {
                flag = true;
              }
            });
            return flag;
          }
        );
        if (parentCategory.parentID) {
          deleteFromParentsCost(parentCategory.parentID);
        }
      }

      function deleteChilds(childsID: string): void {
        childsID
          .split(" ")
          .filter((child) => child !== "")
          .forEach((child) => {
            const childCategory = newCategoriesOfCost.find(
              (categ) => categ.id === child
            ) as IStateCategory;
            if (childCategory.childs !== "") {
              deleteChilds(childCategory.childs);
            }
            newCategoriesOfCost = newCategoriesOfCost.filter(
              (categ) => categ.id !== childCategory.id
            );
          });
      }

      if (category.parentID) {
        const parentCategory = newCategoriesOfCost.find(
          (categ) => categ.id === category.parentID
        ) as IStateCategory;
        parentCategory.childs = parentCategory.childs
          .split(" ")
          .filter((child) => child !== category.id)
          .join(" ");
        deleteFromParentsCost(category.parentID);
      }
      if (category.childs !== "") {
        deleteChilds(category.childs);
      }

      newState.categoriesOfCost.splice(0);
      newState.categoriesOfCost.push(...newCategoriesOfCost);
    })
    .addCase(addCost, (state, action) => {
      const newState = { ...state };
      const category = newState.categoriesOfCost.find(
        (categ) => categ.id === action.payload.categoryID
      ) as IStateCategory;
      category.cost += action.payload.costItem.cost;
      category.costHistory.push(action.payload.costItem);

      function addToParentsCost(parentID: string): void {
        const parentCategory = newState.categoriesOfCost.find(
          (categ) => categ.id === parentID
        ) as IStateCategory;
        parentCategory.cost += action.payload.costItem.cost;
        parentCategory.costHistory.push(action.payload.costItem);
        if (parentCategory.parentID) {
          addToParentsCost(parentCategory.parentID);
        }
      }

      if (category.parentID) {
        addToParentsCost(category.parentID);
      }
    })
    .addCase(changeCost, (state, action) => {
      const newState = { ...state };
      newState.categoriesOfCost.forEach((category) => {
        let diffOfCosts = 0;
        category.costHistory.forEach((costItem: CostHistoryItem) => {
          if (costItem.id === action.payload.id) {
            diffOfCosts = action.payload.cost - costItem.cost;
            costItem.cost = action.payload.cost;
            costItem.date = action.payload.date;
          }
        });
        category.cost += diffOfCosts;
      });
    })
    .addCase(deleteCost, (state, action) => {
      const newState = { ...state };
      newState.categoriesOfCost.forEach((category) => {
        const deletedCostIndex = category.costHistory.findIndex(
          (item) => item.id === action.payload.id
        );
        if (deletedCostIndex !== -1) {
          const deletedCostItem = category.costHistory[deletedCostIndex];
          category.cost -= deletedCostItem.cost;
          category.costHistory = category.costHistory.filter(
            (costItem) => costItem.id !== deletedCostItem.id
          );
        }
      });
    });
});
