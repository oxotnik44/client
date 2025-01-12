import React from "react";
import { ProcessedCellData } from "../types/cellTypes";

interface CellCardProps {
  cell: ProcessedCellData;
  onClick: (number: number) => void;
}

export const CellCard: React.FC<CellCardProps> = ({ cell, onClick }) => {
  return (
    <div
      className="border p-4 flex flex-col justify-between h-28 cursor-pointer hover:bg-gray-100"
      onClick={() => onClick(cell.number)}
    >
      {/* Номер ячейки */}
      <div className="text-gray-600 text-sm">Ячейка: {cell.number}</div>

      {/* Название продукта */}
      <div className="text-lg font-semibold truncate">
        {cell.productName || "Пусто"}
      </div>

      {/* Количество */}
      <div className="flex justify-between text-sm mt-2">
        <div>
          <span className="font-medium">Макс:</span> {cell.maxQuantity}
        </div>
        <div>
          <span className="font-medium">Тек:</span> {cell.currentQuantity}
        </div>
      </div>
    </div>
  );
};
