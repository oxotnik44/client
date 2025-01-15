import { useState } from "react";
import { ModalFillingSteps } from "./components/ModalFillingSteps";
import { ModalFillingActions } from "./components/ModalFillingActions";
import { useStepStore } from "./store/stepStore";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: "keep" | "replace", selectedCount?: number) => void;
  maxCount?: number;
  currentCount: number;
}

export const ModalFilling: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onAction,
  maxCount = 0,
  currentCount,
}) => {
  const {
    step,
    selectedCount,
    setStep,
    setSelectedCount,
  } = useStepStore();

  if (!isOpen) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
      <ModalFillingSteps
        step={step}
        setStep={setStep}
        onClose={onClose}
        maxCount={maxCount}
        selectedCount={selectedCount}
        setSelectedCount={setSelectedCount}
        onAction={onAction}
        currentCount={currentCount}
      />
      <ModalFillingActions
        step={step}
        selectedCount={selectedCount}
        maxCount={maxCount}
        currentCount={currentCount}
        onAction={onAction}
        onClose={onClose}
      />
    </div>
  );
};
