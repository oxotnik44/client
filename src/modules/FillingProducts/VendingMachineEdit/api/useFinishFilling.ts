// src/modules/vendingMachine/api/useFinishFilling.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL_CLIENT } from "src/shared/api/http/axios-instance";

// Функция для завершения затаривания
const finishFilling = async (id: string, selectedCount: number) => {
  for (let i = 0; i < selectedCount; i++) {
    const res = await fetch(`${API_URL_CLIENT}products/cell/${id}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        upload_date: new Date().toISOString(),
        expiration_date: "250 00:10:00",
      }),
    });

    if (!res.ok) {
      throw new Error("Ошибка при добавлении товара");
    }
  }
};

// Хук для выполнения мутации
export const useFinishFilling = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string; selectedCount: number }) =>
      finishFilling(params.id, params.selectedCount),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["productInCell", variables.id],
      });
    },
    onError: (error) => {
      console.error("Ошибка при затаривании:", error);
    },
  });
};
