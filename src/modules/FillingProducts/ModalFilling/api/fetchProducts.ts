// src/modules/FillingProducts/VendingMachineEdit/api/useFetchProducts.ts
import { useQuery } from "@tanstack/react-query";
import { API_URL_CLIENT } from "src/shared/api/http/axios-instance";

const fetchProducts = async () => {
  const response = await fetch(`${API_URL_CLIENT}products/all-product`);
  if (!response.ok) {
    throw new Error("Ошибка при загрузке товаров");
  }
  return response.json();
};

export const useFetchProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};
