import { useState } from "react";
import { Loader } from "src/shared/ui/Loader/Loader";
import { Modal } from "src/app/ui/Modal/Modal";
import { ProductDetails } from "./components/ProductDetails";
import { ModalFilling } from "../ModalFilling/ModalFilling";
import { useFinishFilling } from "./api/useFinishFilling";
import { useWithdrawProducts } from "./api/useWithdrawProducts";
import { useKeepProducts } from "./api/useKeepProducts";
import { useProductInCell } from "./api/useProductInCell";
import { ActionButtons } from "./components/ActionButtons ";
import { useStepStore } from "../ModalFilling/store/stepStore";

export const VendingMachineEdit: React.FC<{ id: string | undefined }> = ({
  id,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);

  // Запрос на данные о товаре в ячейке
  const { data: productInCell, isLoading, error } = useProductInCell(id || "");

  // Мутации для разных действий
  const { mutate: finishFilling, isPending: isFillingLoading } =
    useFinishFilling();
  const { mutate: withdrawProducts, isPending: isWithdrawLoading } =
    useWithdrawProducts();
  const { mutate: keepProducts, isPending: isKeepLoading } = useKeepProducts();
  const { step, selectedCount, setStep, setSelectedCount } = useStepStore();
  // Если идет загрузка или одна из мутаций
  if (isLoading || isFillingLoading || isWithdrawLoading || isKeepLoading)
    return <Loader marginTop={100} />;

  // Если произошла ошибка
  if (error) return <div>Произошла ошибка при загрузке данных о товаре.</div>;

  // Если productInCell не загружен
  if (!productInCell) return <div>Данные не загружены.</div>;
  const maxCount = productInCell?.max_count || 0;
  const currentCount = productInCell?.count || 0;
  const handleAction = async (
    action: "finish" | "withdraw" | "keep",
    count?: number
  ) => {
    if (!id || isSubmitting) return;
    setIsSubmitting(true);

    try {
      switch (action) {
        case "finish":
          if (currentCount >= maxCount)
            return alert("Ячейка уже заполнена полностью.");
          await finishFilling({ id, maxCount, currentCount });
          break;
        case "withdraw":
          if (!currentCount) return alert("В ячейке нет товаров.");
          await withdrawProducts({
            id,
            productIds: productInCell.products.map((p) => p.id),
            countToDelete: selectedCount,
          });
          break;
        case "keep":
          if (count) await keepProducts({ id, count });
          break;
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла ошибка.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="p-4 mt-52 text-center">
      <ProductDetails
        name={productInCell.product.name}
        image={productInCell.product.image}
        count={productInCell.count}
        maxCount={productInCell.max_count}
        id={id}
      />
      <ActionButtons
        productInCell={productInCell}
        onAction={handleAction}
        setVisible={setVisible}
        setStep={setStep}
        isMaxCount={maxCount === currentCount}
      />

      <Modal setVisible={setVisible} visible={visible}>
        <ModalFilling
          isOpen={visible}
          onClose={() => setVisible(false)}
          onAction={(action, count) => {
            if (action === "keep") handleAction("keep", count);
            setVisible(false);
          }}
          maxCount={productInCell?.max_count || 0}
          currentCount={currentCount}
        />
      </Modal>
    </div>
  );
};
