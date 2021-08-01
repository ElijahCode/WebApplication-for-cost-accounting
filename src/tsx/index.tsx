import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { App } from "./app/app";
import { reducer } from "../ts/reducer/reducer";
import { categoryCreator } from "../ts/categoryCreator/categoryCreator";
import { createCostItem } from "../ts/createCostItem/createCostITem";

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

const categories = [
  { ...category1 },
  { ...category2 },
  { ...category3 },
  { ...category4 },
];

const preloadedState: IState = {
  user: "Tester",
  categoriesOfCost: [...categories],
};

const store = configureStore({
  reducer,
  preloadedState,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector(".root")
);
