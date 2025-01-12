import { useCategoriesStore } from "src/modules/Categories/store/categoriesStore";
import { ItemCategoryLink } from "./components/ItemCategoryLink";

export const Categories = () => {
  const { categories } = useCategoriesStore();
  return (
    <div>
      {categories?.length &&
        categories.map((link) => (
          <ItemCategoryLink key={link.id} link={link} />
        ))}
    </div>
  );
};
