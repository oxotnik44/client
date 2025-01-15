// src/modules/FillingProducts/VendingMachineEdit/api/useUpdateProduct.ts
import { useMutation } from "@tanstack/react-query";
import { API_URL_CLIENT } from "src/shared/api/http/axios-instance";

// Тип для параметров обновления товара
interface UpdateProductParams {
  id: string;
  productId: number;
  count: number;
  maxCount: number;
}

const updateProduct = async ({
  id,
  productId,
  count,
  maxCount,
}: UpdateProductParams) => {
  const dataToUpdate = {
    product_id: productId,
    count: count,
    max_count: maxCount,
  };

  const response = await fetch(`${API_URL_CLIENT}products/cell/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToUpdate),
  });

  if (!response.ok) {
    throw new Error("Ошибка при обновлении товара");
  }

  return response.json();
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: updateProduct,
  });
};
