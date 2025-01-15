import { useParams } from "react-router-dom";
import { useProductInCell } from "src/modules/FillingProducts/VendingMachineEdit/api/useProductInCell";
import { API_URL_CLIENT } from "src/shared/api/http/axios-instance";
import { useStepStore } from "../store/stepStore";

interface ModalFillingActionsProps {
  step: "chooseAction" | "keyboard" | "replaceProduct";
  selectedCount: number;
  maxCount: number;
  currentCount: number;
  onAction: (action: "keep" | "replace", selectedCount?: number) => void;
  onClose: () => void;
}

export const ModalFillingActions: React.FC<ModalFillingActionsProps> = ({
  step,
  selectedCount,
  onClose,
  maxCount,
  currentCount,
}) => {
  const { id } = useParams();
  const { refetch } = useProductInCell(id || "");
  const { setStep, productAction, setProductAction } = useStepStore();
  const handleConfirm = async () => {
    if (
      productAction === "addProduct" &&
      selectedCount + currentCount > maxCount
    ) {
      alert("Данное число больше, чем возможно добавить");
      return;
    }
    if (
      productAction === "removeProduct" &&
      selectedCount + currentCount < maxCount
    ) {
      alert("Данное число больше, чем возможно удалить");
      return;
    }
    onClose();

    for (let i = 0; i < selectedCount; i++) {
      try {
        await fetch(`${API_URL_CLIENT}products/cell/${id}/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            upload_date: new Date().toISOString(),
            expiration_date: "2 00:10:00",
          }),
        });
        console.log(`Запрос ${i + 1} выполнен.`);
      } catch (error) {
        console.error(`Ошибка при выполнении запроса ${i + 1}:`, error);
        break;
      }
    }
    await refetch();
  };

  return (
    <>
      {step === "keyboard" && productAction === "addProduct" && (
        <button
          onClick={handleConfirm}
          className="px-6 py-3 bg-green-500 text-white rounded-lg"
        >
          Затарить
        </button>
      )}
      {step === "keyboard" && productAction === "removeProduct" && (
        <button
          onClick={handleConfirm}
          className="px-6 py-3 bg-red-500 text-white rounded-lg"
        >
          Удалить
        </button>
      )}
    </>
  );
};
