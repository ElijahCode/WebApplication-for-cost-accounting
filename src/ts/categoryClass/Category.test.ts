import { Category } from "./Category";

describe("Testing Category Class", () => {
  let parentCategory: Category;
  let category1: Category;
  let category2: Category;
  let category3: Category;

  beforeEach(() => {
    parentCategory = new Category("parentCategory");
    category1 = new Category("category1", parentCategory);
    category2 = new Category("category2", parentCategory);
    category3 = new Category("category3", category2);
  });

  it("Testing getParent method", () => {
    expect(parentCategory.getParent()).toBeNull();
    expect(category1.getParent()).toStrictEqual(parentCategory);
    expect(category2.getParent()).toStrictEqual(parentCategory);
    expect(category3.getParent()).toStrictEqual(category2);
  });

  it("Testing getChilds method", () => {
    expect(parentCategory.getChilds()).toStrictEqual([category1, category2]);
    expect(category2.getChilds()).toStrictEqual([category3]);
  });

  it("Testing get costSum method", () => {
    expect(parentCategory.getCostSum()).toBe(0);
    expect(category1.getCostSum()).toBe(0);
    expect(category2.getCostSum()).toBe(0);
    expect(category3.getCostSum()).toBe(0);
  });

  it("Testing get name method", () => {
    expect(parentCategory.getName()).toBe("parentCategory");
    expect(category1.getName()).toBe("category1");
    expect(category2.getName()).toBe("category2");
    expect(category3.getName()).toBe("category3");
  });

  it("Testing setParent method", () => {
    const grandPa = new Category();
    parentCategory.setParent(grandPa);
    expect(parentCategory.getParent()).toStrictEqual(grandPa);
  });

  it("Testing addChilds method", () => {
    const category4 = new Category("", category1);
    const category5 = new Category("", category1);
    const category6 = new Category("", category3);

    expect(category1.getChilds()).toStrictEqual([category4, category5]);
    expect(category3.getChilds()).toStrictEqual([category6]);
    expect(parentCategory.getChilds()).toStrictEqual([category1, category2]);
    expect(category2.getChilds()).toStrictEqual([category3]);
  });

  it("Testing removeChild method", () => {
    category2.removeChild(category3);

    expect(category2.getChilds()).toStrictEqual([]);

    parentCategory.removeChild(category2);

    expect(parentCategory.getChilds()).toStrictEqual([category1]);
  });

  it("Testing setCostSum method", () => {
    const date1 = new Date(2021, 6, 19, 21);
    const date2 = new Date(2021, 6, 19, 21, 5);
    const date3 = new Date(2021, 6, 19, 21, 10);

    const costHistory1 = {
      cost: 100,
      date: date1.valueOf(),
    };
    const costHistory2 = {
      cost: 200,
      date: date2.valueOf(),
    };
    const costHistory3 = {
      cost: 300,
      date: date3.valueOf(),
    };

    category3.changeCostSum(100, date1.valueOf());
    expect(category3.getCostSum()).toBe(100);
    expect(category2.getCostSum()).toBe(100);
    expect(parentCategory.getCostSum()).toBe(100);
    expect(category3.getCostHistory()).toStrictEqual([costHistory1]);
    expect(category2.getCostHistory()).toStrictEqual([costHistory1]);
    expect(parentCategory.getCostHistory()).toStrictEqual([costHistory1]);

    category2.changeCostSum(category2.getCostSum() + 100, date2.valueOf());

    expect(category3.getCostSum()).toBe(100);
    expect(category2.getCostSum()).toBe(200);
    expect(parentCategory.getCostSum()).toBe(200);
    expect(category3.getCostHistory()).toStrictEqual([costHistory1]);
    expect(category2.getCostHistory()).toStrictEqual([
      costHistory1,
      costHistory2,
    ]);
    expect(parentCategory.getCostHistory()).toStrictEqual([
      costHistory1,
      costHistory2,
    ]);

    parentCategory.changeCostSum(
      parentCategory.getCostSum() + 100,
      date3.valueOf()
    );

    expect(category3.getCostSum()).toBe(100);
    expect(category2.getCostSum()).toBe(200);
    expect(parentCategory.getCostSum()).toBe(300);
    expect(category3.getCostHistory()).toStrictEqual([costHistory1]);
    expect(category2.getCostHistory()).toStrictEqual([
      costHistory1,
      costHistory2,
    ]);
    expect(parentCategory.getCostHistory()).toStrictEqual([
      costHistory1,
      costHistory2,
      costHistory3,
    ]);
  });

  it("Testing setName method", () => {
    parentCategory.setName("category0");

    expect(parentCategory.getName()).toBe("category0");
  });

  it("Testing convertToStateCategory", () => {
    const result1 = {
      name: "parentCategory",
      cost: 0,
      costHistory: [],
      parentName: null,
      childs: ["category1", "category2"],
    };
    const result2 = {
      name: "category1",
      cost: 0,
      costHistory: [],
      parentName: "parentCategory",
      childs: [],
    };
    const result3 = {
      name: "category2",
      cost: 0,
      costHistory: [],
      parentName: "parentCategory",
      childs: ["category3"],
    };
    const result4 = {
      name: "category3",
      cost: 0,
      costHistory: [],
      parentName: "category2",
      childs: [],
    };
    expect(parentCategory.convertToStateCategory()).toStrictEqual(result1);
    expect(category1.convertToStateCategory()).toStrictEqual(result2);
    expect(category2.convertToStateCategory()).toStrictEqual(result3);
    expect(category3.convertToStateCategory()).toStrictEqual(result4);
  });
});
