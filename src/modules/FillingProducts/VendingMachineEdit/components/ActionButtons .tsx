import React from "react";
import { ProductData } from "../types/productTypes";

type ActionButtonsProps = {
  productInCell: ProductData | undefined;
  onAction: (action: "finish" | "withdraw", count?: number) => void;
  setVisible: (value: boolean) => void;
  isMaxCount: boolean;
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  productInCell,
  onAction,
  setVisible,
  isMaxCount,
}) => {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <button
        onClick={() => {
          if (isMaxCount) {
            alert("Товар полон");
          } else {
            setVisible(true);
          }
        }}
        className={`px-8 py-4 text-xl rounded-lg shadow-md ${
          productInCell?.count
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-yellow-500 text-white hover:bg-yellow-600"
        }`}
      >
        {productInCell?.count
          ? "Закончить затаривание"
          : "Что делать с товаром?"}
      </button>
      {productInCell?.count ? (
        <button
          onClick={() => onAction("withdraw")}
          className="px-8 py-4 text-xl bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md"
        >
          Изъять товары
        </button>
      ) : null}
    </div>
  );
};
