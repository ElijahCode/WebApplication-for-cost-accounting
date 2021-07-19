export class Category implements ICategory {
  protected name: string;

  protected costSum;

  protected parentCategory: ICategory | null;

  protected childCategory: ICategory[] | null;

  protected costHistory: CostHistoryItem[];

  constructor(categoryName = "", parent: ICategory | null = null) {
    this.name = categoryName;
    this.costSum = 0;
    this.parentCategory = parent;
    this.childCategory = null;
    this.costHistory = [];
    if (parent) {
      parent.addChilds(this as unknown as ICategory);
    }
  }

  public setParent(parent: ICategory): void {
    this.parentCategory = parent;
  }

  public getParent(): ICategory | null {
    return this.parentCategory;
  }

  public getChilds(): ICategory[] | null {
    return this.childCategory;
  }

  public addChilds(...categories: ICategory[]): ICategory[] {
    const childs = this.childCategory === null ? [] : [...this.childCategory];
    const newChilds = childs.concat(categories);
    this.childCategory = newChilds;
    childs.forEach((child) => child.setParent(this as unknown as ICategory));
    return newChilds;
  }

  public removeChild(category: ICategory): ICategory[] {
    const childs = this.childCategory === null ? [] : [...this.childCategory];
    const newChilds = childs.filter(
      (el) => el.getName() !== category.getName()
    );
    this.childCategory = newChilds;
    return newChilds;
  }

  public changeCostSum(newCost: number, date: number = Date.now()): void {
    this.costSum = +newCost;
    this.updateParentCostSum(newCost, date);
    this.addCost({
      cost: newCost,
      date,
    });
  }

  public getCostSum(): number {
    return this.costSum;
  }

  protected updateParentCostSum(diffCostSum: number, date: number): void {
    if (this.parentCategory) {
      this.parentCategory.changeCostSum(diffCostSum, date);
    }
  }

  public getName(): string {
    return this.name;
  }

  public setName(newName: string): void {
    this.name = newName;
  }

  protected addCost(newCost: CostHistoryItem): void {
    this.costHistory.push(newCost);
  }

  public getCostHistory(): CostHistoryItem[] {
    const costHistory = [...this.costHistory];
    return costHistory;
  }
}
