import React from "react";
import { useNavigate } from "react-router-dom";
import { CellCard } from "./components/CellCard";
import { useCellsData } from "./api/fetchCells";

export const VendingMachineOverview: React.FC = () => {
  const navigate = useNavigate();

  // Используем хук для получения данных
  const { data: cellsData, isLoading, isError, error } = useCellsData();

  const handleCellClick = async (number: number) => {
    // Если запрос успешен, выполняем навигацию
    navigate(`/vending-machine/edit/${number}`);
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <div>Ошибка: {error?.message}</div>;
  }

  return (
    <div className="p-4 mt-52">
      <div className="grid grid-cols-4 gap-2">
        {cellsData?.map((cell) => (
          <CellCard
            key={cell.id}
            cell={cell}
            onClick={() => handleCellClick(cell.id)}
          />
        ))}
      </div>
    </div>
  );
};
