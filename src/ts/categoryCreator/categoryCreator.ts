import uniqid from "uniqid";

export function categoryCreator(name: string): IStateCategory {
  const id = uniqid();
  return {
    name,
    cost: 0,
    id,
    costHistory: [],
    parentID: null,
    childs: "",
  };
}
