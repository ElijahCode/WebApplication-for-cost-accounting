import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import "../../ts/interfaces/interfaces";
import { CategoryTable } from "./categoryTable";
import { categoryCreator } from "../../ts/categoryCreator/categoryCreator";
import { createCostItem } from "../../ts/createCostItem/createCostITem";
import { reducer } from "../../ts/reducer/reducer";

describe("Testing CategoryTable Component", () => {
  describe("Testing markup", () => {
    const category1 = categoryCreator("Category1");
    const category2 = categoryCreator("Category2");
    const category3 = categoryCreator("Category3");
    const category4 = categoryCreator("Category4");

    category1.childs = `${category2.id} `;
    category2.parentID = category1.id;

    category2.childs = `${category3.id} `;
    category3.parentID = category2.id;

    const costItem1 = createCostItem(100, Date.now());
    const costItem2 = createCostItem(200, Date.now());
    const costItem3 = createCostItem(300, Date.now());
    const costItem4 = createCostItem(400, Date.now());

    category1.cost = costItem1.cost + costItem2.cost + costItem3.cost;
    category1.costHistory.push(
      { ...costItem1 },
      { ...costItem2 },
      { ...costItem3 }
    );

    category2.cost = costItem2.cost + costItem3.cost;
    category2.costHistory.push({ ...costItem2 }, { ...costItem3 });

    category3.cost = costItem3.cost;
    category3.costHistory.push({ ...costItem3 });

    category4.cost = costItem4.cost;
    category4.costHistory.push({ ...costItem4 });

    const categories = [category1, category2, category3, category4];

    const preloadedState: IState = {
      user: "Tester",
      categoriesOfCost: categories,
    };

    let store = configureStore({
      reducer,
      preloadedState,
    });

    beforeEach(() => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <CategoryTable />
          </Provider>
        </BrowserRouter>
      );
    });

    afterEach(() => {
      store = configureStore({
        reducer,
        preloadedState,
      });
    });

    it("Have main block", () => {
      expect(screen.getByTestId("CategoryTableBlock")).toBeInTheDocument();
    });
    it("Have add category block", () => {
      expect(screen.getByTestId("AddCategoryBlock")).toBeInTheDocument();
    });
    it("Have categories block", () => {
      expect(screen.getByTestId("CategoriesBlock")).toBeInTheDocument();
      expect(screen.getAllByTestId("categoryItemSubBlock").length).toBe(4);
    });
  });
  describe("Testing functionality", () => {
    const category1 = categoryCreator("Category1");
    const category2 = categoryCreator("Category2");
    const category3 = categoryCreator("Category3");
    const category4 = categoryCreator("Category4");

    category1.childs = `${category2.id} `;
    category2.parentID = category1.id;

    category2.childs = `${category3.id} `;
    category3.parentID = category2.id;

    const costItem1 = createCostItem(100, Date.now());
    const costItem2 = createCostItem(200, Date.now());
    const costItem3 = createCostItem(300, Date.now());
    const costItem4 = createCostItem(400, Date.now());

    category1.cost = costItem1.cost + costItem2.cost + costItem3.cost;
    category1.costHistory.push(
      { ...costItem1 },
      { ...costItem2 },
      { ...costItem3 }
    );

    category2.cost = costItem2.cost + costItem3.cost;
    category2.costHistory.push({ ...costItem2 }, { ...costItem3 });

    category3.cost = costItem3.cost;
    category3.costHistory.push({ ...costItem3 });

    category4.cost = costItem4.cost;
    category4.costHistory.push({ ...costItem4 });

    const categories = [category1, category2, category3, category4];

    const preloadedState: IState = {
      user: "Tester",
      categoriesOfCost: categories,
    };

    let store = configureStore({
      reducer,
      preloadedState,
    });

    beforeEach(() => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <CategoryTable />
          </Provider>
        </BrowserRouter>
      );
    });

    afterEach(() => {
      store = configureStore({
        reducer,
        preloadedState,
      });
    });

    it("Testing adding category", () => {
      userEvent.type(screen.getByTestId("addCategoryNameInput"), "Category5");
      userEvent.type(screen.getByTestId("addCategoryParentInput"), "Category4");
      userEvent.click(screen.getByTestId("addCategoryButton"));

      expect(store.getState().categoriesOfCost.length).toBe(5);
      expect(screen.getAllByTestId("categoryItemSubBlock").length).toBe(5);
      expect(
        (screen.getByTestId("addCategoryNameInput") as HTMLInputElement).value
      ).toBe("");
      expect(
        (screen.getByTestId("addCategoryParentInput") as HTMLInputElement).value
      ).toBe("");

      userEvent.click(screen.getAllByTestId("AddSubCategoryButton")[4]);

      expect(
        (screen.getByTestId("addCategoryParentInput") as HTMLInputElement).value
      ).toBe("Category5");

      userEvent.type(screen.getByTestId("addCategoryNameInput"), "Category6");
      userEvent.click(screen.getByTestId("addCategoryButton"));

      expect(store.getState().categoriesOfCost.length).toBe(6);
      expect(screen.getAllByTestId("categoryItemSubBlock").length).toBe(6);
    });

    it("Testing changing category name", () => {
      userEvent.click(screen.getAllByTestId("ChangeCategoryNameButton")[3]);

      expect(screen.getByTestId("ChangeCategoryNameBlock")).toBeInTheDocument();
      expect(screen.getByTestId("ChangeCategoryNameInput")).toBeInTheDocument();
      expect(
        screen.getByTestId("ChangeCategoryNameMainButton")
      ).toBeInTheDocument();

      userEvent.type(
        screen.getByTestId("ChangeCategoryNameInput"),
        "CategoryWithoutNumber"
      );
      userEvent.click(screen.getByTestId("ChangeCategoryNameMainButton"));

      expect(store.getState().categoriesOfCost[3].name).toBe(
        "CategoryWithoutNumber"
      );

      expect(
        screen.queryByTestId("ChangeCategoryNameBlock")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId("ChangeCategoryNameInput")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId("ChangeCategoryNameMainButton")
      ).not.toBeInTheDocument();
    });
  });
});
