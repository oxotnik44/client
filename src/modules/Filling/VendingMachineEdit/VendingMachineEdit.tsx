import { useState } from "react";
import { Modal } from "src/app/ui/Modal/Modal";
import { ModalFilling } from "src/modules/FillingProducts/ModalFilling";
import { useFinishFilling } from "src/modules/FillingProducts/VendingMachineEdit/api/useFinishFilling";
import { useKeepProducts } from "src/modules/FillingProducts/VendingMachineEdit/api/useKeepProducts";
import { useProductInCell } from "src/modules/FillingProducts/VendingMachineEdit/api/useProductInCell";
import { useWithdrawProducts } from "src/modules/FillingProducts/VendingMachineEdit/api/useWithdrawProducts";
import { ActionButtons } from "src/modules/FillingProducts/VendingMachineEdit/components/ActionButtons ";
import { ProductDetails } from "src/modules/FillingProducts/VendingMachineEdit/components/ProductDetails";
import { Loader } from "src/shared/ui/Loader/Loader";

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
            count: currentCount,
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
        />
      </Modal>
    </div>
  );
};
