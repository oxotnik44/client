import React from "react";

type ProductDetailsProps = {
  name: string;
  image: string;
  count: number;
  maxCount: number;
  id: string | undefined;
};

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  name,
  image,
  count,
  maxCount,
  id,
}) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Информация о ячейке #{id}</h1>

      <img
        src={image}
        alt={name}
        className=" max-w-[200px] h-auto object-contain mb-4" // Сделано адаптивным
      />
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-700">
        Текущее количество: {count} / {maxCount}
      </p>
    </div>
  );
};
