// src/modules/vendingMachine/api/useWithdrawProducts.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL_CLIENT } from "src/shared/api/http/axios-instance";

// Функция для изъятия товаров
const withdrawProducts = async (
  id: string,
  productIds: string[],
  selectedCount: number
) => {
  if (selectedCount > productIds.length) {
    throw new Error(
      "Количество для удаления превышает количество доступных товаров"
    );
  }

  for (let i = 0; i < selectedCount; i++) {
    const productId = productIds[i]; // Получаем ID товара из списка
    const res = await fetch(
      `${API_URL_CLIENT}products/cell/${id}/products/${productId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!res.ok) {
      throw new Error(`Ошибка при изъятии товара с ID: ${productId}`);
    }
  }
};

// Хук для использования мутации
export const useWithdrawProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      id: string;
      productIds: string[];
      selectedCount: number;
    }) => withdrawProducts(params.id, params.productIds, params.selectedCount),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["productInCell", variables.id],
      });
    },
    onError: (error) => {
      console.error("Ошибка при изъятии товара:", error);
    },
  });
};
