import { FC, ReactNode } from "react";
import { ProductCard } from "src/modules/ProductCard/ProductCard";

interface LayoutProps {
  children?: ReactNode;
}

export const ProductCardPage: FC<LayoutProps> = () => {
  return (
    <div className="w-[1080px]  h-[1920px]">
      <div className="pt-[220px] h-[1920px] w-full">
        <ProductCard />
      </div>
    </div>
  );
};
