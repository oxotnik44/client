interface Category {
  id: number;
  name: string;
  sku: string;
  image: string;
}

interface CategoryStore {
  firstCategoryId: number;
  categories: Category[]; // Массив категорий
  setFirstCategoryId: (id: number) => void;
  setCategories: (categories: Category[]) => void; // Метод для обновления массива категорий
}
