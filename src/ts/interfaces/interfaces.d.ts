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
  parentCategory: ICategory | null;
  childCategory: ICategory[] | null;
  costHistory: CostHistoryItem[];
  public setParent(parent: ICategory): void;
  public getParent(): ICategory | null;
  public getChilds(): ICategory[] | null;
  public addChilds(...categories: ICategory[]): ICategory[];
  public removeChild(category: ICategory): ICategory[] | null;
  public changeCostSum(newCost: number, date?: number): void;
  public getCostSum(): number;
  protected updateParentCostSum(diffCostSum: number, date?: number): void;
  public setName(newName: string): void;
  public getName(): string;
  protected addCost(newCost: CostHistoryItem): void;
  public getCostHistory(): CostHistoryItem[];
}

declare interface IState {
  user: string;
  categoriesOfCost: ICategory[] | null;
}
