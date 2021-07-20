declare interface ICategory extends IProtoCategory {
  [key: string]: any;
}

declare interface CostHistoryItem {
  cost: number;
  date: number;
}

interface IProtoCategory {
  name: string;
  costSum: number;
  parentCategory: Category | null;
  childCategory: Category[] | null;
  costHistory: CostHistoryItem[];
  public setParent(parent: Category): void;
  public getParent(): Category | null;
  public getChilds(): Category[] | null;
  public addChilds(...categories: Category[]): Category[];
  public removeChild(category: Category): Category[] | null;
  public changeCostSum(newCost: number, date?: number): void;
  public getCostSum(): number;
  protected updateParentCostSum(diffCostSum: number, date?: number): void;
  public setName(newName: string): void;
  public getName(): string;
  public addCost(newCost: CostHistoryItem): void;
  public getCostHistory(): CostHistoryItem[];
}

declare interface IState {
  user: string;
  categoriesOfCost: Category[] | null;
}

declare interface ActionsAddCategoryPayload {
  category: Category;
  parent?: Category;
}

declare interface ActionsAddCostPayload {
  cost: number;
  date: number;
  category: Category;
}
