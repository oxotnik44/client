import { Link } from "react-router-dom";
import { Product } from "../types/productsTypes";
import { OutOfStock } from "../ui/OutOfStock";

type Props = {
  product: Product;
};

export const ItemProduct = ({ product }: Props) => {
  // Проверяем, есть ли хотя бы один товар с count === 0
  if (product.id === 1) {
    product.cells[0].count = 0;
  }
  const isOutOfStock = product.cells.some((cell) => cell.count === 0);

  return (
    <div className="relative w-[312px] mb-[52px]">
      <Link
        to={`/product/${product.id}`}
        className="rounded-[33px] h-[396px] flex-col justify-start items-center flex bg-layoutColor"
      >
        <div className="font-bold text-[20px] text-center w-[90%] h-[24px] mt-[34px]">
          {product.name}
        </div>
        <div className="mt-[30px]"></div>
        <div className="w-full max-w-[206px] h-full max-h-[158px] overflow-hidden rounded-lg">
          <img
            className="w-full h-full object-contain"
            src={product.image}
            alt="image product"
          />
        </div>

        <div className="h-[29px] text-[24px] font-black mt-[15px]">
          {(product.price / 100).toFixed(2) + "₽"}
        </div>
        <button
          className={`mt-[28px] rounded-[17px] w-[262px] h-[52px] text-[18px] font-bold flex justify-center items-center text-white ${"bg-orange"}`} // Изменяем стиль кнопки, если товара нет
          // disabled={isOutOfStock} // Делаем кнопку неактивной, если товара нет
        >
          Приготовить
          {/* {!isOutOfStock && "Приготовить"} */}
        </button>
      </Link>
      {/* <OutOfStock isOutOfStock={isOutOfStock} /> */}
    </div>
  );
};
