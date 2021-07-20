import { Category } from "../categoryClass/Category";

interface FindCategory {
  (name: string, category: Category): Category | FindCategory;
}

export function findCategory(
  name: string,
  ...categories: Category[]
): Category | undefined {
  let result: Category | undefined;
  for (let j = 0; j < categories.length; j += 1) {
    result = categories[j].getName() === name ? categories[j] : undefined;
    if (result) {
      break;
    }
    const childs = categories[j].getChilds();
    result =
      childs === null
        ? undefined
        : childs.find((categ) => categ.getName() === name);
    if (!result && childs !== null) {
      for (let i = 0; i < childs.length; i += 1) {
        result = findCategory(name, childs[i]);
        if (result) {
          break;
        }
      }
    }
    if (result) {
      break;
    }
  }
  return result;
}
