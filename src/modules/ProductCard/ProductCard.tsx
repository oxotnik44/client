import { Link, useParams } from "react-router-dom";
import { useProductCard } from "./api/fetchProductCard";
import { Loader } from "src/shared/ui/Loader/Loader";
import { ActionFooter } from "src/components/ActionFooter/ActionFooter";
import arrowLeft from "src/assets/arrow-left.svg";
import { ProductCardDetails } from "./ui/ProductCardDetails";
import { ProductPrice } from "./ui/ProductPrice";
import { CookingLink } from "./ui/CookingLink";

export const ProductCard = () => {
  // Получаем id из URL
  const { id } = useParams<{ id: string }>();
  // Получаем данные продукта по id
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProductCard(Number(id));

  // Если данные еще загружаются
  if (isLoading) {
    return <Loader marginTop={100} />;
  }

  // Если произошла ошибка при загрузке
  if (isError) {
    return (
      <div className="flex items-center justify-center h-full">
        Ошибка при загрузке данных: {error?.message}
        <Link
          to={`/products/1`}
          className="flex w-[330px] ml-[46px] mt-[4%] rounded-[30px] h-[84px] justify-center items-center bg-buttonBg"
        >
          <img src={arrowLeft} alt={"return"} />
          <div className="font-bold text-[28px]">Назад в меню</div>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex text-center h-full flex-col justify-center items-center">
      <div className="text-[66px] text-center w-[80%] font-black">
        {product?.name}
      </div>
      <ProductCardDetails
        image={product?.image}
        name={product?.name}
        composition={product?.composition}
      />

      <ProductPrice price={product?.price} />
      <CookingLink to="/cooking" text="Перейти к готовке" icon={arrowLeft} />

      <ActionFooter />
    </div>
  );
};
