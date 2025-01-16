import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Categories } from "src/modules/Categories/Categories";
import { Products } from "src/modules/Products/Products";

interface LayoutProps {
  children?: ReactNode;
}

export const ProductsPage: FC<LayoutProps> = () => {
  return (
    <div className="w-[1080px] grid grid-cols-layout h-[1920px]">
      <div className="pt-[48px] border-r-[2px] border-r-layoutLine bg-layoutColor">
        <Link to="/">
          <button className="absolute top-20 left-[20px] bg-orange rounded-[50px] w-[300px] h-[80px] text-[18px] font-semibold text-white hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 shadow-lg">
            <p className="text-3xl"> На главную</p>
          </button>
        </Link>
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
