import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
import {
  setUserName,
  addCategory,
  addCost,
  deleteCategory,
} from "../actions/actions";
import { Category } from "../categoryClass/Category";

describe("Testing store reducer", () => {
  describe("Testing setUserName action", () => {
    it("User name nust be Bob", () => {
      const preloadedState = {
        user: "",
        categoriesOfCost: [],
      };
      const store = configureStore({
        reducer,
        preloadedState,
      });

      store.dispatch(setUserName("Bob"));

      expect(store.getState().user).toBe("Bob");
    });
  });
  describe("Testing addCategory action", () => {
    it("Test without parent category", () => {
      const firstCategory = new Category("firstCategory");
      const testCategory = new Category("testCategory");
      const preloadedState = {
        user: "",
        categoriesOfCost: [firstCategory.convertToStateCategory()],
      };
      const store = configureStore({
        reducer,
        preloadedState,
      });

      store.dispatch(addCategory(testCategory.convertToStateCategory()));
      const result = [
        {
          name: "firstCategory",
          cost: 0,
          costHistory: [],
          parentName: null,
          childs: [],
        },
        {
          name: "testCategory",
          cost: 0,
          costHistory: [],
          parentName: null,
          childs: [],
        },
      ];
      expect(store.getState().categoriesOfCost.length).toBe(2);
      expect(store.getState().categoriesOfCost).toStrictEqual(result);
    });
    it("Test with parent category", () => {
      const firstCategory = new Category("firstCategory");
      const testCategory = new Category("testCategory");
      firstCategory.addChilds(testCategory);
      const preloadedState = {
        user: "",
        categoriesOfCost: [firstCategory.convertToStateCategory()],
      };
      const store = configureStore({
        reducer,
        preloadedState,
      });
      store.dispatch(addCategory(testCategory.convertToStateCategory()));
      const result = [
        {
          name: "firstCategory",
          cost: 0,
          costHistory: [],
          parentName: null,
          childs: ["testCategory"],
        },
        {
          name: "testCategory",
          cost: 0,
          costHistory: [],
          parentName: "firstCategory",
          childs: [],
        },
      ];
      expect(store.getState().categoriesOfCost).toStrictEqual(result);
    });
  });
  describe("Testing addCost action", () => {
    it("Testing category without childs", () => {
      const category = new Category("Test");
      const spy = category.convertToStateCategory();
      const preloadedState = {
        user: "",
        categoriesOfCost: [category.convertToStateCategory()],
      };
      const store = configureStore({
        reducer,
        preloadedState,
      });

      const dateCost = Date.now();

      category.changeCostSum(100, dateCost);

      store.dispatch(addCost(category.convertToStateCategory()));

      expect(store.getState().categoriesOfCost).toStrictEqual([
        category.convertToStateCategory(),
      ]);
    });
  });
});
