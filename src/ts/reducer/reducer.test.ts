import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
import {
  setUserName,
  addCategory,
  addCost,
  deleteCategory,
} from "../actions/actions";

describe("Testing store reducer", () => {
  it("Use setUserName action", () => {
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
