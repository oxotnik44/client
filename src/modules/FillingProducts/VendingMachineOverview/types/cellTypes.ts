export interface CellData {
  id: number;
  product: {
    name: string;
  };
  number: number;
  count: number;
  max_count: number;
}
export interface ProcessedCellData {
  id: number;
  number: number;
  productName: string;
  maxQuantity: number;
  currentQuantity: number;
}
