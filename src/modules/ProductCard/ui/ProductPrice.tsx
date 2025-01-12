import React from "react";

interface ProductPriceProps {
  price?: number;
}

export const ProductPrice: React.FC<ProductPriceProps> = ({ price }) => {
  return (
    <div className="bg-layoutLine rounded-[28px] mt-10 px-12 py-6 text-4xl font-bold">
      {price !== undefined
        ? `${(price / 100).toFixed(2)} ₽`
        : "Цена не указана"}
    </div>
  );
};
