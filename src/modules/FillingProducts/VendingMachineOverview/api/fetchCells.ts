import { useQuery } from "@tanstack/react-query";
import { API_URL_CLIENT } from "src/shared/api/http/axios-instance"; // Убедитесь, что путь правильный
import { CellData, ProcessedCellData } from "../types/cellTypes";

// Функция для загрузки данных ячейки
const fetchCellsData = async (): Promise<ProcessedCellData[]> => {
  const response = await fetch(`${API_URL_CLIENT}products/cell`);
  if (!response.ok) {
    throw new Error("Ошибка при загрузке данных ячеек");
  }

  const data: CellData[] = await response.json();

  // Преобразование данных в нужный формат и добавление id ячейки
  return data.map((cell) => ({
    id: cell.id, // Добавляем id ячейки
    number: cell.number,
    productName: cell.product?.name || "Пусто",
    maxQuantity: cell.max_count,
    currentQuantity: cell.count,
  }));
};

// Хук для получения данных
export const useCellsData = () => {
  return useQuery<ProcessedCellData[], Error>({
    queryKey: ["cellsData"],
    queryFn: fetchCellsData,
  });
};
