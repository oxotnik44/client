import { useState } from "react";
import { ModalFillingSteps } from "./components/ModalFillingSteps";
import { ModalFillingActions } from "./components/ModalFillingActions";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: "keep" | "replace", selectedCount?: number) => void;
  maxCount?: number;
}

export const ModalFilling: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onAction,
  maxCount = 0,
}) => {
  const [step, setStep] = useState<
    "chooseAction" | "keyboard" | "replaceProduct"
  >("chooseAction");
  const [selectedCount, setSelectedCount] = useState(0);

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
      />
      <ModalFillingActions
        step={step}
        selectedCount={selectedCount}
        maxCount={maxCount}
        onAction={onAction}
        onClose={onClose}
      />
    </div>
  );
};
