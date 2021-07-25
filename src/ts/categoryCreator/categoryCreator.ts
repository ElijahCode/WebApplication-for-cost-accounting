import { uuid } from "uuidv4";

export function categoryCreator(name: string): IStateCategory {
  const id = uuid();
  return {
    name,
    cost: 0,
    id,
    costHistory: [],
    parentID: null,
    childs: "",
  };
}
