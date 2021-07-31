import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import { CostTable } from "./costTable";
import { createCostItem } from "../../ts/createCostItem/createCostITem";
import { reducer } from "../../ts/reducer/reducer";
import { categoryCreator } from "../../ts/categoryCreator/categoryCreator";
import "../../ts/interfaces/interfaces";

describe("Testing costTable component", () => {
  describe("Testing basic markup", () => {
    const category = categoryCreator("Category");

    const costItem1 = createCostItem(100, Date.parse("2021-07-29"));
    const costItem2 = createCostItem(200, Date.parse("2021-07-24"));
    const costItem3 = createCostItem(300, Date.parse("2021-06-30"));
    const costItem4 = createCostItem(400, Date.parse("2020-07-25"));

    category.cost =
      costItem1.cost + costItem2.cost + costItem3.cost + costItem4.cost;
    category.costHistory.push(
      { ...costItem1 },
      { ...costItem2 },
      { ...costItem3 },
      { ...costItem4 }
    );

    const costTableProps = {
      costHistory: [
        { ...costItem1 },
        { ...costItem2 },
        { ...costItem3 },
        { ...costItem4 },
      ],
    };

    const preloadedState: IState = {
      user: "Tester",
      categoriesOfCost: [{ ...category }],
    };

    let store = configureStore({
      reducer,
      preloadedState,
    });

    beforeEach(() => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <CostTable {...costTableProps} />
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

    it("Contain cost table", () => {
      expect(screen.getByTestId("CostTable")).toBeInTheDocument();
    });

    it("Contain date block", () => {
      expect(screen.getByTestId("DateBlock")).toBeInTheDocument();
      expect(screen.getByTestId("ShowCostParag")).toBeInTheDocument();
      expect(screen.getByTestId("AllLink")).toBeInTheDocument();
      expect(screen.getByTestId("WeekLink")).toBeInTheDocument();
      expect(screen.getByTestId("MonthLink")).toBeInTheDocument();
      expect(screen.getByTestId("YearLink")).toBeInTheDocument();
    });

    it("Contain add cost block", () => {
      expect(screen.getByTestId("addCostBlock")).toBeInTheDocument();
      expect(screen.getByTestId("addCostParag")).toBeInTheDocument();
      expect(screen.getByTestId("addCostInput")).toBeInTheDocument();
      expect(screen.getByTestId("addCostDateParag")).toBeInTheDocument();
      expect(screen.getByTestId("AddCostDateInput")).toBeInTheDocument();
      expect(
        screen.getByTestId("addCostCategoryNameParag")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("addCostCategoryNameInput")
      ).toBeInTheDocument();
      expect(screen.getByTestId("AddCostButton")).toBeInTheDocument();
    });

    it("Contain cost items", () => {
      expect(screen.getAllByTestId("tableString").length).toBe(4);
      expect(screen.getAllByTestId("costName").length).toBe(4);
      expect(screen.getAllByTestId("costDate").length).toBe(4);
      expect(screen.getAllByTestId("buttonChagneCost").length).toBe(4);
      expect(screen.getAllByTestId("buttonDeleteCost").length).toBe(4);
    });
  });
  describe("Testing functionality", () => {
    const category = categoryCreator("Category");

    const todayDate = new Date(Date.now());
    const todayMonth =
      todayDate.getMonth() > 9
        ? todayDate.getMonth() + 1
        : `0${todayDate.getMonth() + 1}`;
    const todayDay =
      todayDate.getDate() > 9 ? todayDate.getDate() : `0${todayDate.getDate()}`;
    const todayYear = todayDate.getFullYear();

    const weekAgoDate = new Date(todayDate.setDate(todayDate.getDate() - 4));
    const weekAgoMonth =
      weekAgoDate.getMonth() > 9
        ? weekAgoDate.getMonth() + 1
        : `0${weekAgoDate.getMonth() + 1}`;
    const weekAgoDay =
      weekAgoDate.getDate() > 9
        ? weekAgoDate.getDate()
        : `0${weekAgoDate.getDate()}`;

    const monthAgoDate = new Date(todayDate.setDate(todayDate.getDate() - 23));
    const monthAgoMonth =
      monthAgoDate.getMonth() > 9
        ? monthAgoDate.getMonth() + 1
        : `0${monthAgoDate.getMonth() + 1}`;
    const monthAgoDay =
      monthAgoDate.getDate() > 9
        ? monthAgoDate.getDate()
        : `0${monthAgoDate.getDate()}`;

    const yearAgoDate = new Date(todayDate.setDate(todayDate.getDate() - 333));
    const yearAgoMonth =
      yearAgoDate.getMonth() > 9
        ? yearAgoDate.getMonth() + 1
        : `0${yearAgoDate.getMonth() + 1}`;
    const yearAgoDay =
      yearAgoDate.getDate() > 9
        ? yearAgoDate.getDate()
        : `0${yearAgoDate.getDate()}`;

    const costItem1 = createCostItem(
      100,
      Date.parse(`${todayYear}-${todayMonth}-${todayDay}`)
    );
    const costItem2 = createCostItem(
      200,
      Date.parse(`${weekAgoDate.getFullYear()}-${weekAgoMonth}-${weekAgoDay}`)
    );
    const costItem3 = createCostItem(
      300,
      Date.parse(
        `${monthAgoDate.getFullYear()}-${monthAgoMonth}-${monthAgoDay}`
      )
    );
    const costItem4 = createCostItem(
      400,
      Date.parse(`${yearAgoDate.getFullYear()}-${yearAgoMonth}-${yearAgoDay}`)
    );

    category.cost =
      costItem1.cost + costItem2.cost + costItem3.cost + costItem4.cost;
    category.costHistory.push(
      { ...costItem1 },
      { ...costItem2 },
      { ...costItem3 },
      { ...costItem4 }
    );

    const costTableProps = {
      costHistory: [
        { ...costItem1 },
        { ...costItem2 },
        { ...costItem3 },
        { ...costItem4 },
      ],
    };

    const preloadedState: IState = {
      user: "Tester",
      categoriesOfCost: [
        {
          ...category,
          costHistory: [...category.costHistory],
        },
      ],
    };

    let store = configureStore({
      reducer,
      preloadedState,
    });

    beforeEach(() => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <CostTable {...costTableProps} />
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

    it("Cand add new cost with correct time", () => {
      const newCostDate = "2021-06-27T21:34";
      const costItem5 = createCostItem(
        500,
        new Date(Date.parse(newCostDate)).valueOf()
      );

      userEvent.type(screen.getByTestId("addCostInput"), "500");
      userEvent.clear(screen.getByTestId("AddCostDateInput"));
      userEvent.type(
        screen.getByTestId("AddCostDateInput"),
        "27.06.2021 21:34"
      );
      userEvent.type(
        screen.getByTestId("addCostCategoryNameInput"),
        "Category"
      );

      userEvent.click(screen.getByTestId("AddCostButton"));

      const result = {
        cost: store.getState().categoriesOfCost[0].costHistory[4].cost,
        date: store.getState().categoriesOfCost[0].costHistory[4].date,
      };

      expect(result).toStrictEqual({
        cost: costItem5.cost,
        date: costItem5.date,
      });
      expect(screen.getAllByTestId("tableString").length).toBe(5);
      expect(
        (screen.getByTestId("addCostInput") as HTMLInputElement).value
      ).toBe("0");

      const costDate = new Date(Date.now());
      const day =
        costDate.getDate() > 9
          ? `${costDate.getDate()}`
          : `0${costDate.getDate()}`;
      const month =
        costDate.getMonth() > 9
          ? `${costDate.getMonth() + 1}`
          : `0${costDate.getMonth() + 1}`;
      const year = costDate.getFullYear();
      const hour =
        costDate.getHours() > 9
          ? `${costDate.getHours()}`
          : `0${costDate.getHours()}`;
      const minutes =
        costDate.getMinutes() > 9
          ? `${costDate.getMinutes()}`
          : `0${costDate.getMinutes()}`;
      const resultCostDate = `${day}.${month}.${year} ${hour}:${minutes}`;

      expect(
        (screen.getByTestId("AddCostDateInput") as HTMLInputElement).value
      ).toBe(resultCostDate);
    });

    it("Can correct delete cost", () => {
      userEvent.click(screen.getAllByTestId("buttonDeleteCost")[2]);
      expect(screen.getAllByTestId("tableString").length).toBe(3);
      expect(store.getState().categoriesOfCost[0].costHistory.length).toBe(3);
    });

    it("Correct filter cost list when link is clicked", () => {
      userEvent.click(screen.getByTestId("WeekLink"));

      expect(screen.getAllByTestId("tableString").length).toBe(2);

      userEvent.click(screen.getByTestId("MonthLink"));

      expect(screen.getAllByTestId("tableString").length).toBe(3);

      userEvent.click(screen.getByTestId("YearLink"));

      expect(screen.getAllByTestId("tableString").length).toBe(4);

      userEvent.click(screen.getByTestId("WeekLink"));
      userEvent.click(screen.getByTestId("AllLink"));

      expect(screen.getAllByTestId("tableString").length).toBe(4);
    });
  });
  describe("Testing advanced functionality", () => {
    const category1 = categoryCreator("Category1");
    const category2 = categoryCreator("Category2");
    const category3 = categoryCreator("Category3");

    category2.childs = `${category3.id} `;
    category3.parentID = category2.id;

    const costItem1 = createCostItem(100, Date.now());
    const costItem2 = createCostItem(200, Date.now());
    const costItem3 = createCostItem(300, Date.now());
    const costItem4 = createCostItem(400, Date.now());
    const costItem5 = createCostItem(500, Date.now());
    const costItem6 = createCostItem(600, Date.now());

    category1.cost = costItem1.cost + costItem2.cost;
    category1.costHistory.push({ ...costItem1 }, { ...costItem2 });

    category2.cost =
      costItem3.cost + costItem4.cost + costItem5.cost + costItem6.cost;
    category2.costHistory.push(
      { ...costItem3 },
      { ...costItem4 },
      { ...costItem5 },
      { ...costItem6 }
    );

    category3.cost = costItem5.cost + costItem6.cost;
    category3.costHistory.push({ ...costItem5 }, { ...costItem6 });

    const costTableProps = {
      costHistory: [
        { ...costItem1 },
        { ...costItem2 },
        { ...costItem3 },
        { ...costItem4 },
        { ...costItem5 },
        { ...costItem6 },
      ],
    };

    const categories = [{ ...category1 }, { ...category2 }, { ...category3 }];

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
            <CostTable {...costTableProps} />
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

    it("Correct add new cost", () => {
      const newCostDate = "2021-06-27T21:34";
      const costItem7 = createCostItem(
        700,
        new Date(Date.parse(newCostDate)).valueOf()
      );

      userEvent.type(screen.getByTestId("addCostInput"), "700");
      userEvent.clear(screen.getByTestId("AddCostDateInput"));
      userEvent.type(
        screen.getByTestId("AddCostDateInput"),
        "27.06.2021 21:34"
      );
      userEvent.type(
        screen.getByTestId("addCostCategoryNameInput"),
        "Category3"
      );

      userEvent.click(screen.getByTestId("AddCostButton"));

      const result = {
        cost: store.getState().categoriesOfCost[2].costHistory[2].cost,
        date: store.getState().categoriesOfCost[2].costHistory[2].date,
      };

      expect(result).toStrictEqual({
        cost: costItem7.cost,
        date: costItem7.date,
      });
      expect(store.getState().categoriesOfCost[1].cost).toBe(
        category2.cost + costItem7.cost
      );
      expect(screen.getAllByTestId("tableString").length).toBe(7);
    });
  });
});
