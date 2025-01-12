import { Link, useLocation } from "react-router-dom";
import { cn } from "src/lib/utils.ts";

export type Props = {
  link: Category;
};

export const ItemCategoryLink = ({ link }: Props) => {
  const location = useLocation();
  const categoryId = Number(location.pathname.replace("/products/", ""));

  return (
    <Link
      className={cn(
        "w-full h-[120px] flex items-center",
        categoryId === link.id && "bg-selectCategory"
      )}
      to={`/products/${link.id}`} // Переход по маршруту с id категории
    >
      <img
        className="ml-[25px] h-[86px] w-[86px] rounded-xl"
        src={link.image}
        alt={link.name}
      />
      <div className="text-[28px] ml-[22px] font-bold"> {link.name} </div>
    </Link>
  );
};
