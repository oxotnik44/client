import React from "react";
import { KeyboardStep } from "./components/KeyboardStep";
import { useStepStore } from "../VendingMachineEdit/store/stepStore";
import { ProductSelect } from "./components/ProductSelect";

interface ModalFillingStepsProps {
  step: "chooseAction" | "keyboard" | "replaceProduct";
  setStep: (newStep: "chooseAction" | "keyboard" | "replaceProduct") => void;
  maxCount: number;
  selectedCount: number;
  setSelectedCount: (count: number) => void;
  currentCount: number;
  isOpen: boolean;
  onClose: () => void;
  products: { id: string; name: string; image: string }[];
}

export const ModalFilling: React.FC<ModalFillingStepsProps> = ({
  step,
  maxCount,
  selectedCount,
  setSelectedCount,
  currentCount,
  onClose,
  products,
}) => {
  const { productAction } = useStepStore();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
      {/* Контент модального окна */}
      {step === "replaceProduct" && <ProductSelect onClose={onClose} />}
      {step === "keyboard" && (
        <KeyboardStep
          selectedCount={selectedCount}
          setSelectedCount={setSelectedCount}
          maxCount={maxCount}
          currentCount={currentCount}
          productAction={productAction}
          onClose={onClose}
          products={products}
        />
      )}
    </div>
  );
};
