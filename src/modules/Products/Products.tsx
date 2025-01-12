import { useCategoryProducts } from "src/modules/Products/api/fetchCategoryProducts";
import { ItemProduct } from "./components/ItemProduct";
import { useParams } from "react-router-dom";
import { Loader } from "src/shared/ui/Loader/Loader";

export const Products = () => {
  // Получаем id из URL
  const { id } = useParams<{ id: string }>();

  // Получаем данные продуктов по id категории
  const { data, isLoading, isError, error } = useCategoryProducts(Number(id));

  // Если данные еще загружаются
  if (isLoading) {
    return <Loader marginTop={550} />;
  }

  // Если произошла ошибка при загрузке
  if (isError) {
    return (
      <div className="flex items-center justify-center h-full">
        Ошибка при загрузке данных: {error?.message}
      </div>
    );
  }

  return (
    <div className="pt-[220px] w-full flex flex-col items-center">
      <div className="grid grid-cols-2 self-auto justify-self-stretch items-stretch w-full px-[30px]">
        {data &&
          data.map((product) => (
            <ItemProduct key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};
