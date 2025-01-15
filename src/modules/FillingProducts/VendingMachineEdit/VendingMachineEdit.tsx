import React from "react";
import { Loader } from "src/shared/ui/Loader/Loader";
import { Modal } from "src/app/ui/Modal/Modal";
import { useVendingMachineLogic } from "./hooks/useVendingMachineLogic";
import { ProductDetails } from "./components/ProductDetails";
import { ActionButtons } from "./components/ActionButtons ";
import { ModalFilling } from "../ModalFilling";

export const VendingMachineEdit: React.FC<{ id: string | undefined }> = ({
  id,
}) => {
  const {
    step,
    isLoading,
    visible,
    productInCell,
    maxCount,
    currentCount,
    selectedCount,
    setSelectedCount,
    handleAction,
    setVisible,
    setStep,
  } = useVendingMachineLogic(id);

  if (isLoading) return <Loader marginTop={100} />;
  if (!productInCell) return <div>Данные не загружены.</div>;

  return (
    <div className="p-4 mt-52 text-center">
      <ProductDetails
        name={productInCell.product.name}
        image={productInCell.product.image}
        count={productInCell.count}
        maxCount={productInCell.max_count}
        number={productInCell.number}
      />
      <ActionButtons
        currentCount={currentCount}
        onAction={handleAction}
        setVisible={setVisible}
        setStep={setStep}
        isMaxCount={maxCount === currentCount}
      />
      <Modal setVisible={setVisible} visible={visible}>
        <ModalFilling
          step={step} // Пример, как передать step, обязательно передайте нужный шаг
          setStep={setStep}
          maxCount={maxCount}
          selectedCount={selectedCount}
          setSelectedCount={setSelectedCount}
          currentCount={currentCount}
          isOpen={visible} // Убедитесь, что передаете isOpen
          onClose={() => setVisible(false)} // Правильный onClose
          products={productInCell.products}
        />
      </Modal>
    </div>
  );
};
