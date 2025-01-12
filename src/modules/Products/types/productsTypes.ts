export type Category = {
  id: number;
  name: string;
  sku: string;
  image: string;
};

export type Cell = {
  id: number;
  count: number;
  max_count: number;
  number: number;
  product: Omit<Product, "cells">; // Продукт без поля cells
};

export type Product = {
  id: number;
  name: string;
  description: string;
  composition: string;
  image: string;
  price: number;
  sku: string;
  expiration_date?: string;
  category: Category;
  cells: Cell[];
};
