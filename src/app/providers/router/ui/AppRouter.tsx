import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "src/app/layout/Layout";
import { Categories } from "src/modules/Categories/Categories";
import { CookingPage } from "src/pages/CookingPage";
import { HomePage } from "src/pages/HomePage";
import { OrderReleasePage } from "src/pages/OrderReleasePage";
import { ProductCardPage } from "src/pages/ProductCardPage";
import { ProductsPage } from "src/pages/ProductsPage";
import { VendingMachineEditPage } from "src/pages/VendingMachineEditPage";
import { VendingMachineOverviewPage } from "src/pages/VendingMachineOverviewPage";

export const AppRouter = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<HomePage />} />
          <Route path="products" element={<ProductsPage />}>
            <Route path=":id" element={<Categories />} />
          </Route>
          <Route path="productCard">
            <Route path=":id" element={<ProductCardPage />} />
          </Route>
          <Route path="cooking" element={<CookingPage />} />
          <Route path="orderRealese" element={<OrderReleasePage />} />
          <Route path="vending-machine">
            <Route index={true} element={<VendingMachineOverviewPage />} />
            <Route path="edit/:id" element={<VendingMachineEditPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};
