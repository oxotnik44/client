import React from "react";

interface ProductDetailsProps {
  image: string | undefined;
  name: string | undefined;
  composition: string | undefined;
}

export const ProductCardDetails: React.FC<ProductDetailsProps> = ({
  image,
  name,
  composition,
}) => {
  return (
    <div className="flex w-[900px] justify-between mt-[42px] h-[930px]">
      <img
        className="w-full max-w-[460px] h-auto rounded-[128px] "
        src={image}
        alt={name}
      />

      <div className="w-full max-w-[506px] px-6 ml-6 bg-cardProductComposition rounded-[54px]">
        <div className="text-[28px] text-center pt-[26px] font-black">
          Состав:
        </div>
        <div className="text-[22px] text-left font-semibold">{composition}</div>
      </div>
    </div>
  );
};
