declare interface CostHistoryItem {
  cost: number;
  date: number;
  id: string;
}

declare interface IStateCategory {
  name: string;
  cost: number;
  id: string;
  costHistory: CostHistoryItem[];
  parentID: string | null;
  childs: string;
}

declare interface IActionChangeCategoryName {
  newName: IStateCategory["name"];
  category: IStateCategory;
}

declare interface IActionAddCost {
  categoryID: IStateCategory["id"];
  costItem: CostHistoryItem;
}

declare interface IState {
  user: string;
  categoriesOfCost: IStateCategory[];
}

declare interface ActionsAddCostPayload {
  cost: number;
  date: number;
  category: IStateCategory;
}
