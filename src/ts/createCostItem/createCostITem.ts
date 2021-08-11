import uniqid from "uniqid";

export function createCostItem(cost: number, date: number): CostHistoryItem {
  const id = uniqid();
  return {
    cost,
    date,
    id,
  };
}
