import { FC, ReactNode } from "react";
import { Categories } from "src/modules/Categories/Categories";
import { Products } from "src/modules/Products/Products";

interface LayoutProps {
  children?: ReactNode;
}

export const ProductsPage: FC<LayoutProps> = () => {
  return (
    <div className="w-[1080px] grid grid-cols-layout h-[1920px]">
      <div className="pt-[48px] border-r-[2px] border-r-layoutLine bg-layoutColor">
        <div className="h-[158px] w-[100%] mt-44">
          <Categories />
        </div>
      </div>
      <main>
        <Products />
      </main>
    </div>
  );
};
