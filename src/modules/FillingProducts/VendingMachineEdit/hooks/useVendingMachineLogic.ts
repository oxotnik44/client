import { useState } from "react";
import { useProductInCell } from "../api/useProductInCell";
import { useWithdrawProducts } from "../api/useWithdrawProducts";
import { useKeepProducts } from "../api/useKeepProducts";
import { useFinishFilling } from "../api/useFinishFilling";
import { useStepStore } from "../store/stepStore";

export const useVendingMachineLogic = (id: string | undefined) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);

  const { step, selectedCount, setStep, setSelectedCount } = useStepStore();
  const { data: productInCell, isLoading } = useProductInCell(id || "");
  const { mutate: finishFilling } = useFinishFilling();
  const { mutate: withdrawProducts } = useWithdrawProducts();
  const { mutate: keepProducts } = useKeepProducts();

  const maxCount = productInCell?.max_count ?? 0;
  const currentCount = productInCell?.count ?? 0;
  const productIds = productInCell?.products?.map((p) => p.id) ?? [];

  const showAlert = (message: string) => alert(message);

  const handleAction = async (
    action: "finish" | "withdraw" | "keep",
    count?: number
  ) => {
    if (!id || isSubmitting) return;

    const actionHandlers = {
      finish: async () => {
        if (currentCount >= maxCount)
          return showAlert("Ячейка уже заполнена полностью.");
        await finishFilling({ id, maxCount, currentCount });
      },
      withdraw: async () => {
        if (!currentCount) return showAlert("В ячейке нет товаров.");
        await withdrawProducts({
          id,
          productIds,
          countToDelete: selectedCount,
        });
      },
      keep: async () => {
        if (count) await keepProducts({ id, count });
      },
    };

    setIsSubmitting(true);
    try {
      await actionHandlers[action]();
    } catch (error) {
      console.error("Ошибка:", error);
      showAlert("Произошла ошибка.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isLoading,
    isSubmitting,
    visible,
    productInCell,
    maxCount,
    currentCount,
    step,
    selectedCount,
    handleAction,
    setVisible,
    setStep,
    setSelectedCount,
  };
};
