declare interface CostHistoryItem {
  cost: number;
  date: number;
}

declare interface IStateCategory {
  name: string;
  cost: number;
  costHistory: CostHistoryItem[];
  parentName: string | null;
  childs: string[];
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

interface ICategory {
  public setParent(parent: Category): void;
  public getParent(): Category | null;
  public getChilds(): Category[] | null;
  public addChilds(...categories: Category[]): Category[];
  public removeChild(category: Category): Category[] | null;
  public changeCostSum(newCost: number, date?: number): void;
  public getCostSum(): number;
  public setName(newName: string): void;
  public getName(): string;
  public addCost(newCost: CostHistoryItem): void;
  public getCostHistory(): CostHistoryItem[];
  public convertToStateCategory(): IStateCategory;
}
