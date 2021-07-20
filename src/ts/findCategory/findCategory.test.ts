import { findCategory } from "./findCategory";
import { Category } from "../categoryClass/Category";

describe("Testing findCategory function", () => {
  const rootCategory = new Category("Main");
  rootCategory.addChilds(new Category("Food"), new Category("Apartment"));
  rootCategory
    .getChilds()[0]
    .addChilds(
      new Category("Meat"),
      new Category("Green"),
      new Category("Other")
    );
  rootCategory
    .getChilds()[1]
    .addChilds(
      new Category("Rooms"),
      new Category("Service"),
      new Category("Jeneral")
    );
  rootCategory
    .getChilds()[1]
    .getChilds()[2]
    .addChilds(
      new Category("Cleaning"),
      new Category("Gas"),
      new Category("Electricity")
    );

  it("Testing 1st level name", () => {
    expect(findCategory("Food", rootCategory)).toStrictEqual(
      rootCategory.getChilds()[0]
    );
    expect(findCategory("Apartment", rootCategory)).toStrictEqual(
      rootCategory.getChilds()[1]
    );
  });
  it("Testing 2nd level name", () => {
    expect(findCategory("Meat", rootCategory)).toStrictEqual(
      rootCategory.getChilds()[0].getChilds()[0]
    );
    expect(findCategory("Green", rootCategory)).toStrictEqual(
      rootCategory.getChilds()[0].getChilds()[1]
    );
    expect(findCategory("Other", rootCategory)).toStrictEqual(
      rootCategory.getChilds()[0].getChilds()[2]
    );

    expect(findCategory("Rooms", rootCategory)).toStrictEqual(
      rootCategory.getChilds()[1].getChilds()[0]
    );
    expect(findCategory("Service", rootCategory)).toStrictEqual(
      rootCategory.getChilds()[1].getChilds()[1]
    );
    expect(findCategory("Jeneral", rootCategory)).toStrictEqual(
      rootCategory.getChilds()[1].getChilds()[2]
    );
  });
  it("Testing 3hd level name", () => {
    const jeneral: Category = rootCategory.getChilds()[1].getChilds()[2];

    expect(findCategory("Cleaning", rootCategory)).toStrictEqual(
      jeneral.getChilds()[0]
    );
    expect(findCategory("Gas", rootCategory)).toStrictEqual(
      jeneral.getChilds()[1]
    );
    expect(findCategory("Electricity", rootCategory)).toStrictEqual(
      jeneral.getChilds()[2]
    );
  });

  const rootCategory2 = new Category("Dreams");
  rootCategory2.addChilds(new Category("Rest"), new Category("New_apartment"));

  const rootCategory3 = new Category("Education");
  rootCategory3.addChilds(new Category("Courses"));
  rootCategory3.getChilds()[0].addChilds(new Category("Programming"));

  it("Test 1st level name with many arguments", () => {
    expect(
      findCategory("Main", rootCategory, rootCategory2, rootCategory3)
    ).toStrictEqual(rootCategory);
    expect(
      findCategory("Dreams", rootCategory, rootCategory2, rootCategory3)
    ).toStrictEqual(rootCategory2);
    expect(
      findCategory("Education", rootCategory, rootCategory2, rootCategory3)
    ).toStrictEqual(rootCategory3);
  });
  it("Test 2st level name with many arguments", () => {
    const [food, apartment] = rootCategory.getChilds();
    const [rest, newApartmant] = rootCategory2.getChilds();
    const courses = rootCategory3.getChilds()[0];

    expect(
      findCategory("Food", rootCategory, rootCategory2, rootCategory3)
    ).toStrictEqual(food);
    expect(
      findCategory("Apartment", rootCategory, rootCategory2, rootCategory3)
    ).toStrictEqual(apartment);
    expect(
      findCategory("Rest", rootCategory, rootCategory2, rootCategory3)
    ).toStrictEqual(rest);
    expect(
      findCategory("New_apartment", rootCategory, rootCategory2, rootCategory3)
    ).toStrictEqual(newApartmant);
    expect(
      findCategory("Courses", rootCategory, rootCategory2, rootCategory3)
    ).toStrictEqual(courses);
  });
  it("Test 3st level name with many arguments", () => {
    const programmimg = rootCategory3.getChilds()[0].getChilds()[0];
    expect(
      findCategory("Programming", rootCategory, rootCategory2, rootCategory3)
    ).toStrictEqual(programmimg);
  });
});
