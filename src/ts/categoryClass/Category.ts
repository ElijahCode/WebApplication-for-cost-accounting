export class Category implements ICategory {
  private name: string;

  private costSum;

  private parentCategory: Category | null;

  private childCategory: Category[] | null;

  private costHistory: CostHistoryItem[];

  constructor(categoryName = "", parent: Category | null = null) {
    this.name = categoryName;
    this.costSum = 0;
    this.parentCategory = parent;
    this.childCategory = null;
    this.costHistory = [];
    if (parent) {
      parent.addChilds(this as unknown as Category);
    }
  }

  public setParent(parent: Category): void {
    this.parentCategory = parent;
  }

  public getParent(): Category | null {
    return this.parentCategory;
  }

  public getChilds(): Category[] | null {
    return this.childCategory;
  }

  public addChilds(...categories: Category[]): Category[] {
    const childs = this.childCategory === null ? [] : [...this.childCategory];
    const newChilds = childs.concat(categories);
    this.childCategory = newChilds;
    childs.forEach((child) => child.setParent(this as unknown as Category));
    return newChilds;
  }

  public removeChild(category: Category): Category[] {
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

  public addCost(newCost: CostHistoryItem): void {
    this.costHistory.push(newCost);
  }

  public getCostHistory(): CostHistoryItem[] {
    const costHistory = [...this.costHistory];
    return costHistory;
  }
}
