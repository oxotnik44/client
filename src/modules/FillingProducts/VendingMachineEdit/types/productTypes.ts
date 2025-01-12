// Тип для исходных данных о ячейках (продуктах)
export interface CellData {
  product: {
    id: string;
    name: string;
    image: string;
    price: number; // Добавляем поле price
    category: {
      id: string;
      name: string;
      image: string;
    }; // Категория товара
  };
  count?: number; // Сделать count необязательным
  max_count?: number; // Сделать max_count необязательным
  // Могут быть другие поля в зависимости от API
}

export interface ProductData {
  id: string;
  name: string;
  image: string;
  description?: string;
  price: number;
  product: {
    id: number;
    name: string;
    image: string;
  };
  category: {
    id: string;
    name: string;
    image: string;
  }; // Категория товара
  composition?: string; // Состав товара
  expiration_date?: string; // Срок годности (если есть)
  sku: string; // Артикул товара
  products: Array<{
    id: string;
    name: string;
    image: string;
  }>; // Массив продуктов, если они есть
  count: number; // Количество товара в ячейке
  max_count: number; // Максимальное количество товара в ячейке
}
export interface Product {
  id: string;
  name: string;
  image: string;
  count: number;
  max_count: number;
}

export interface ProductInCell {
  product: Product;
  count: number;
  max_count: number;
  products: Product[];
}
