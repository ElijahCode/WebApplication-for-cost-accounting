import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
import {
  setUserName,
  addCategory,
  addCost,
  deleteCategory,
  changeCost,
  deleteCost,
  changeCategoryName,
} from "./actions";
import { categoryCreator } from "../categoryCreator/categoryCreator";
import { createCostItem } from "../createCostItem/createCostITem";

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
      const category1 = categoryCreator("Category1");
      const category2 = categoryCreator("Category2");
      const category3 = categoryCreator("Category3");

      const preloadedState = {
        user: "",
        categoriesOfCost: [],
      };
      const store = configureStore({
        reducer,
        preloadedState,
      });

      store.dispatch(addCategory(category1));

      expect(store.getState().categoriesOfCost).toStrictEqual([category1]);

      store.dispatch(addCategory(category2));

      expect(store.getState().categoriesOfCost).toStrictEqual([
        category1,
        category2,
      ]);

      store.dispatch(addCategory(category3));

      expect(store.getState().categoriesOfCost).toStrictEqual([
        category1,
        category2,
        category3,
      ]);
    });
    it("Test with parent category", () => {
      const parentCategory = categoryCreator("parent1");
      const parentCategory2 = categoryCreator("parent2");
      const parents = [{ ...parentCategory }, { ...parentCategory2 }];
      const preloadedState = {
        user: "",
        categoriesOfCost: parents,
      };
      const store = configureStore({
        reducer,
        preloadedState,
      });

      const child = categoryCreator("child");
      child.parentID = parentCategory.id;
      const child2 = categoryCreator("child2");
      child2.parentID = parentCategory.id;

      store.dispatch(addCategory(child));
      parentCategory.childs = `${child.id} `;
      expect(store.getState().categoriesOfCost).toStrictEqual([
        parentCategory,
        parentCategory2,
        child,
      ]);
      expect(store.getState().categoriesOfCost[0].childs).toBe(`${child.id} `);

      store.dispatch(addCategory(child2));
      parentCategory.childs = `${child.id} ${child2.id} `;
      expect(store.getState().categoriesOfCost).toStrictEqual([
        parentCategory,
        parentCategory2,
        child,
        child2,
      ]);
      expect(store.getState().categoriesOfCost[0].childs).toBe(
        `${child.id} ${child2.id} `
      );

      const child3 = categoryCreator("child");
      child3.parentID = parentCategory2.id;
      const child4 = categoryCreator("child2");
      child4.parentID = parentCategory2.id;

      store.dispatch(addCategory(child3));
      parentCategory2.childs = `${child3.id} `;
      expect(store.getState().categoriesOfCost).toStrictEqual([
        parentCategory,
        parentCategory2,
        child,
        child2,
        child3,
      ]);
      expect(store.getState().categoriesOfCost[1].childs).toBe(`${child3.id} `);

      store.dispatch(addCategory(child4));
      parentCategory2.childs = `${child3.id} ${child4.id} `;
      expect(store.getState().categoriesOfCost).toStrictEqual([
        parentCategory,
        parentCategory2,
        child,
        child2,
        child3,
        child4,
      ]);
      expect(store.getState().categoriesOfCost[1].childs).toBe(
        `${child3.id} ${child4.id} `
      );

      const child5 = categoryCreator("child5");
      child5.parentID = child.id;
      const child6 = categoryCreator("child6");
      child6.parentID = child3.id;

      store.dispatch(addCategory(child5));

      child.childs = `${child5.id} `;
      expect(store.getState().categoriesOfCost).toStrictEqual([
        parentCategory,
        parentCategory2,
        child,
        child2,
        child3,
        child4,
        child5,
      ]);
      expect(store.getState().categoriesOfCost[2].childs).toBe(`${child5.id} `);

      store.dispatch(addCategory(child6));

      child3.childs = `${child6.id} `;
      expect(store.getState().categoriesOfCost).toStrictEqual([
        parentCategory,
        parentCategory2,
        child,
        child2,
        child3,
        child4,
        child5,
        child6,
      ]);
      expect(store.getState().categoriesOfCost[4].childs).toBe(`${child6.id} `);
    });
  });
  describe("Testing change category name action", () => {
    it("Testing without childs", () => {
      const category1 = categoryCreator("Jeneral");

      const preloadedState = {
        user: "",
        categoriesOfCost: [{ ...category1 }],
      };
      const store = configureStore({
        reducer,
        preloadedState,
      });

      store.dispatch(
        changeCategoryName({
          newName: "Other",
          category: category1,
        })
      );

      category1.name = "Other";

      expect(store.getState().categoriesOfCost).toStrictEqual([category1]);
    });
    it("Testing with childs", () => {
      const category1 = categoryCreator("category1");
      const category2 = categoryCreator("category2");
      const category3 = categoryCreator("category3");

      category1.childs = `${category2.id} `;
      category2.parentID = category1.id;
      category2.childs = `${category3.id} `;
      category3.parentID = category2.id;

      const categories = [{ ...category1 }, { ...category2 }, { ...category3 }];

      const preloadedState = {
        user: "",
        categoriesOfCost: categories,
      };
      const store = configureStore({
        reducer,
        preloadedState,
      });

      store.dispatch(
        changeCategoryName({
          newName: "Main",
          category: category1,
        })
      );

      category1.name = "Main";

      expect(store.getState().categoriesOfCost).toStrictEqual([
        category1,
        category2,
        category3,
      ]);

      store.dispatch(
        changeCategoryName({
          newName: "SubMain",
          category: category2,
        })
      );

      category2.name = "SubMain";

      expect(store.getState().categoriesOfCost).toStrictEqual([
        category1,
        category2,
        category3,
      ]);

      store.dispatch(
        changeCategoryName({
          newName: "SubSubMain",
          category: category3,
        })
      );

      category3.name = "SubSubMain";

      expect(store.getState().categoriesOfCost).toStrictEqual([
        category1,
        category2,
        category3,
      ]);
    });
  });
  describe("Delete category actions", () => {
    it("Testing without child and parents", () => {
      const category1 = categoryCreator("category1");
      const category2 = categoryCreator("category2");
      const category3 = categoryCreator("category3");

      const categories = [{ ...category1 }, { ...category2 }, { ...category3 }];

      const preloadedState = {
        user: "",
        categoriesOfCost: categories,
      };
      const store = configureStore({
        reducer,
        preloadedState,
      });

      store.dispatch(deleteCategory(category3));

      expect(store.getState().categoriesOfCost).toStrictEqual([
        category1,
        category2,
      ]);

      store.dispatch(deleteCategory(category2));

      expect(store.getState().categoriesOfCost).toStrictEqual([category1]);

      store.dispatch(deleteCategory(category1));

      expect(store.getState().categoriesOfCost).toStrictEqual([]);
    });
    it("Testing with childs", () => {
      const category1 = categoryCreator("category1");
      const category2 = categoryCreator("category2");
      const category3 = categoryCreator("category3");

      category1.childs = `${category2.id} `;
      category2.parentID = category1.id;
      category2.childs = `${category3.id} `;
      category3.parentID = category2.id;

      category3.cost = 100;
      const category3CostItem = createCostItem(category3.cost, Date.now());
      category3.costHistory.push(category3CostItem);

      category2.cost = 300;
      const category2CostItem = createCostItem(200, Date.now());
      category2.costHistory.push(category3CostItem, category2CostItem);
      category2.childs = "";

      category1.cost = 700;
      const category1CostItem = createCostItem(400, Date.now());
      category1.costHistory.push(
        category3CostItem,
        category2CostItem,
        category1CostItem
      );

      const categories = [{ ...category1 }, { ...category2 }, { ...category3 }];

      const preloadedState = {
        user: "",
        categoriesOfCost: categories,
      };
      const store = configureStore({
        reducer,
        preloadedState,
      });

      store.dispatch(deleteCategory(category3));

      category2.cost = 200;
      category2.costHistory = [category2CostItem];

      category1.cost = 600;
      category1.costHistory = [category2CostItem, category1CostItem];

      expect(store.getState().categoriesOfCost).toStrictEqual([
        category1,
        category2,
      ]);

      store.dispatch(deleteCategory(category2));

      category1.cost = 400;
      category1.costHistory = [category1CostItem];
      category1.childs = "";

      expect(store.getState().categoriesOfCost).toStrictEqual([category1]);
    });
    it("Testing deleting parent category", () => {
      const category1 = categoryCreator("category1");
      const category2 = categoryCreator("category2");
      const category3 = categoryCreator("category3");
      const category4 = categoryCreator("category3");

      category1.childs = `${category2.id} `;
      category2.parentID = category1.id;

      category2.childs = `${category3.id} `;
      category3.parentID = category2.id;

      category3.childs = `${category4.id} `;
      category4.parentID = category3.id;

      const categories = [
        { ...category1 },
        { ...category2 },
        { ...category3 },
        { ...category4 },
      ];

      const preloadedState = {
        user: "",
        categoriesOfCost: categories,
      };
      const store = configureStore({
        reducer,
        preloadedState,
      });
      store.dispatch(deleteCategory(category2));
      category1.childs = "";
      expect(store.getState().categoriesOfCost).toStrictEqual([category1]);
    });
  });
  describe("Testing addCost action", () => {
    it("Testing category without parents", () => {
      const category = categoryCreator("category");
      const preloadedState = {
        user: "",
        categoriesOfCost: [{ ...category }],
      };
      const store = configureStore({
        reducer,
        preloadedState,
      });

      const dateCost1 = Date.now();
      const costItem1 = createCostItem(100, dateCost1);
      store.dispatch(
        addCost({
          categoryID: category.id,
          costItem: costItem1,
        })
      );
      category.cost += 100;
      category.costHistory.push(costItem1);

      expect(store.getState().categoriesOfCost).toStrictEqual([category]);

      const dateCost2 = Date.now();
      const costItem2 = createCostItem(200, dateCost2);
      store.dispatch(
        addCost({
          categoryID: category.id,
          costItem: costItem2,
        })
      );
      category.cost += 200;
      category.costHistory.push(costItem2);

      expect(store.getState().categoriesOfCost).toStrictEqual([category]);

      const dateCost3 = Date.now();
      const costItem3 = createCostItem(300, dateCost3);
      store.dispatch(
        addCost({
          categoryID: category.id,
          costItem: costItem3,
        })
      );
      category.cost += 300;
      category.costHistory.push(costItem3);

      expect(store.getState().categoriesOfCost).toStrictEqual([category]);
    });
    it("Testing category with parents", () => {
      const category1 = categoryCreator("Category1");
      const category2 = categoryCreator("Category2");
      const category3 = categoryCreator("Category3");

      category1.childs = `${category2.id} `;
      category2.parentID = category1.id;
      category2.childs = `${category3.id} `;
      category3.parentID = category2.id;

      const categories = [
        { ...category1, costHistory: [] },
        { ...category2, costHistory: [] },
        { ...category3, costHistory: [] },
      ];

      const preloadedState = {
        user: "",
        categoriesOfCost: categories,
      };

      const store = configureStore({
        reducer,
        preloadedState,
      });

      const dateCost = Date.now();
      const historyCostItem = createCostItem(134, dateCost);
      const AddHistoryCostItem = {
        categoryID: category3.id,
        costItem: historyCostItem,
      };

      store.dispatch(addCost(AddHistoryCostItem));

      category1.cost += historyCostItem.cost;
      category2.cost += historyCostItem.cost;
      category3.cost += historyCostItem.cost;

      category1.costHistory.push(historyCostItem);
      category2.costHistory.push(historyCostItem);
      category3.costHistory.push(historyCostItem);

      expect(store.getState().categoriesOfCost[0]).toStrictEqual(category1);
      expect(store.getState().categoriesOfCost[1]).toStrictEqual(category2);
      expect(store.getState().categoriesOfCost[2]).toStrictEqual(category3);

      const dateCost2 = Date.now();
      const historyCostItem2 = createCostItem(356, dateCost2);
      const AddHistoryCostItem2 = {
        categoryID: category2.id,
        costItem: historyCostItem2,
      };

      store.dispatch(addCost(AddHistoryCostItem2));

      category1.cost += historyCostItem2.cost;
      category2.cost += historyCostItem2.cost;

      category1.costHistory.push(historyCostItem2);
      category2.costHistory.push(historyCostItem2);

      expect(store.getState().categoriesOfCost[0]).toStrictEqual(category1);
      expect(store.getState().categoriesOfCost[1]).toStrictEqual(category2);
      expect(store.getState().categoriesOfCost[2]).toStrictEqual(category3);

      const dateCost3 = Date.now();
      const historyCostItem3 = createCostItem(476, dateCost3);
      const AddHistoryCostItem3 = {
        categoryID: category1.id,
        costItem: historyCostItem3,
      };

      store.dispatch(addCost(AddHistoryCostItem3));

      category1.cost += historyCostItem3.cost;

      category1.costHistory.push(historyCostItem3);

      expect(store.getState().categoriesOfCost[0]).toStrictEqual(category1);
      expect(store.getState().categoriesOfCost[1]).toStrictEqual(category2);
      expect(store.getState().categoriesOfCost[2]).toStrictEqual(category3);
    });
  });
  describe("Testing changeCost action", () => {
    it("Must change costItem to all categories", () => {
      const category1 = categoryCreator("category1");
      const category2 = categoryCreator("category2");
      const category3 = categoryCreator("category3");

      category1.childs = `${category2.id} `;
      category2.parentID = category1.id;
      category2.childs = `${category3.id} `;
      category3.parentID = category2.id;

      const costItem1 = createCostItem(100, Date.now());
      const costItem2 = createCostItem(200, Date.now());
      const costItem3 = createCostItem(300, Date.now());
      const costItem4 = createCostItem(400, Date.now());
      const costItem5 = createCostItem(500, Date.now());
      const costItem6 = createCostItem(600, Date.now());

      category1.cost = 2100;
      category1.costHistory.push(
        costItem1,
        costItem2,
        costItem3,
        costItem4,
        costItem5,
        costItem6
      );

      category2.cost = 1000;
      category2.costHistory.push(costItem1, costItem2, costItem3, costItem4);

      category3.cost = 300;
      category3.costHistory.push(costItem1, costItem2);

      const categories = [
        {
          ...category1,
          costHistory: [...category1.costHistory],
        },
        {
          ...category2,
          costHistory: [...category2.costHistory],
        },
        {
          ...category3,
          costHistory: [...category3.costHistory],
        },
      ];

      const preloadedState = {
        user: "",
        categoriesOfCost: [...categories],
      };

      const store = configureStore({
        reducer,
        preloadedState,
      });
      const newCostItem1 = {
        cost: 300,
        date: costItem1.date,
        id: costItem1.id,
      };

      store.dispatch(changeCost(newCostItem1));

      category1.cost = 2300;
      category1.costHistory.shift();
      category1.costHistory.unshift(newCostItem1);

      category2.cost = 1200;
      category2.costHistory.shift();
      category2.costHistory.unshift(newCostItem1);

      category3.cost = 500;
      category3.costHistory.shift();
      category3.costHistory.unshift(newCostItem1);

      expect(store.getState().categoriesOfCost[0].costHistory).toStrictEqual(
        category1.costHistory
      );

      const newCostItem3 = {
        cost: 100,
        date: costItem3.date + 200,
        id: costItem3.id,
      };
      store.dispatch(changeCost(newCostItem3));

      category1.cost = 2100;
      category1.costHistory.splice(0);
      category1.costHistory.push(
        newCostItem1,
        costItem2,
        newCostItem3,
        costItem4,
        costItem5,
        costItem6
      );

      category2.cost = 1000;
      category2.costHistory.splice(0);
      category2.costHistory.push(
        newCostItem1,
        costItem2,
        newCostItem3,
        costItem4
      );

      expect(store.getState().categoriesOfCost).toStrictEqual([
        category1,
        category2,
        category3,
      ]);

      const newCostItem6 = {
        cost: 400,
        date: costItem6.date - 200,
        id: costItem6.id,
      };
      store.dispatch(changeCost(newCostItem6));

      category1.cost = 1900;
      category1.costHistory.pop();
      category1.costHistory.push(newCostItem6);

      expect(store.getState().categoriesOfCost).toStrictEqual([
        category1,
        category2,
        category3,
      ]);
    });
  });
  describe("Testing deleteCost action", () => {
    it("Testing without childs", () => {
      const category = categoryCreator("category1");
      const someCostItem1 = createCostItem(300, Date.now());
      const someCostItem2 = createCostItem(400, Date.now());
      const someCostItem3 = createCostItem(500, Date.now());
      category.cost =
        someCostItem1.cost + someCostItem2.cost + someCostItem3.cost;
      category.costHistory.push(someCostItem1, someCostItem2, someCostItem3);

      const preloadedState = {
        user: "",
        categoriesOfCost: [
          {
            ...category,
            costHistory: [...category.costHistory],
          },
        ],
      };

      const store = configureStore({
        reducer,
        preloadedState,
      });

      store.dispatch(deleteCost(someCostItem2));

      category.cost -= someCostItem2.cost;
      category.costHistory = category.costHistory.filter(
        (item) => item.id !== someCostItem2.id
      );

      expect(store.getState().categoriesOfCost).toStrictEqual([category]);

      store.dispatch(deleteCost(someCostItem3));

      category.cost -= someCostItem3.cost;
      category.costHistory = category.costHistory.filter(
        (item) => item.id !== someCostItem3.id
      );

      expect(store.getState().categoriesOfCost).toStrictEqual([category]);

      store.dispatch(deleteCost(someCostItem1));

      category.cost -= someCostItem1.cost;
      category.costHistory = category.costHistory.filter(
        (item) => item.id !== someCostItem1.id
      );

      expect(store.getState().categoriesOfCost).toStrictEqual([category]);
    });
    it("Testing with childs", () => {
      const category1 = categoryCreator("category1");
      const category2 = categoryCreator("category2");
      const category3 = categoryCreator("category3");

      category1.childs = `${category2} `;
      category2.parentID = category1.id;

      category2.childs = `${category3} `;
      category3.parentID = category2.id;

      const someCostItem1 = createCostItem(300, Date.now());
      const someCostItem2 = createCostItem(400, Date.now());
      const someCostItem3 = createCostItem(500, Date.now());

      category1.cost =
        someCostItem1.cost + someCostItem2.cost + someCostItem3.cost;
      category1.costHistory.push(someCostItem1, someCostItem2, someCostItem3);

      category2.cost = someCostItem2.cost + someCostItem3.cost;
      category2.costHistory.push(someCostItem2, someCostItem3);

      category3.cost = someCostItem3.cost;
      category3.costHistory.push(someCostItem3);

      const categories = [
        {
          ...category1,
          costHistory: category1.costHistory,
        },
        {
          ...category2,
          costHistory: category2.costHistory,
        },
        {
          ...category3,
          costHistory: category3.costHistory,
        },
      ];

      const preloadedState = {
        user: "",
        categoriesOfCost: categories,
      };

      const store = configureStore({
        reducer,
        preloadedState,
      });

      store.dispatch(deleteCost(someCostItem3));

      category1.cost -= someCostItem3.cost;
      category1.costHistory = category1.costHistory.filter(
        (costItem) => costItem.id !== someCostItem3.id
      );

      category2.cost -= someCostItem3.cost;
      category2.costHistory = category2.costHistory.filter(
        (costItem) => costItem.id !== someCostItem3.id
      );

      category3.cost -= someCostItem3.cost;
      category3.costHistory = category3.costHistory.filter(
        (costItem) => costItem.id !== someCostItem3.id
      );

      expect(store.getState().categoriesOfCost).toStrictEqual([
        category1,
        category2,
        category3,
      ]);

      store.dispatch(deleteCost(someCostItem2));

      category1.cost -= someCostItem2.cost;
      category1.costHistory = category1.costHistory.filter(
        (costItem) => costItem.id !== someCostItem2.id
      );

      category2.cost -= someCostItem2.cost;
      category2.costHistory = category2.costHistory.filter(
        (costItem) => costItem.id !== someCostItem2.id
      );

      expect(store.getState().categoriesOfCost).toStrictEqual([
        category1,
        category2,
        category3,
      ]);

      store.dispatch(deleteCost(someCostItem1));

      category1.cost -= someCostItem1.cost;
      category1.costHistory = category1.costHistory.filter(
        (costItem) => costItem.id !== someCostItem1.id
      );

      expect(store.getState().categoriesOfCost).toStrictEqual([
        category1,
        category2,
        category3,
      ]);
    });
  });
});
