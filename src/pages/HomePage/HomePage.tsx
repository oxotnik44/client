import { useEffect } from "react";
import mess from "src/assets/messageHome.png";
import payment from "src/assets/payment.png";
import { Link } from "react-router-dom";
import { useCategories } from "./api/fetchCategoriesApi";
import { useCategoriesStore } from "../../modules/Categories/store/categoriesStore";
import { Loader } from "src/shared/ui/Loader/Loader";

export const HomePage = () => {
  // Загружаем категории с помощью хука
  const { data: categories, isLoading, isError } = useCategories();

  // Получаем id первой категории, если они есть
  const firstCategoryId = categories?.[0]?.id || 0;

  // Используем Zustand для сохранения состояния категорий и id
  const { setFirstCategoryId, setCategories } = useCategoriesStore();

  // Используем useEffect для сохранения данных в Zustand
  useEffect(() => {
    if (categories?.length) {
      setCategories(categories); // Сохраняем все категории
      setFirstCategoryId(firstCategoryId); // Сохраняем id первой категории
    }
  }, [categories, setCategories, setFirstCategoryId, firstCategoryId]);

  if (isLoading) return <Loader marginTop={350} />;
  if (isError) return <p>Ошибка при загрузке категорий</p>;

  return (
    <div className="bg-home min-w-[1080px] min-h-[1920px] relative">
      {/* Кнопка перехода на /stocking */}
      <Link to="/vending-machine">
        <button className="absolute top-20 left-[20px] bg-orange rounded-[50px] w-[300px] h-[80px] text-[18px] font-semibold text-white hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 shadow-lg">
          <p className="text-3xl"> Затаривание</p>
        </button>
      </Link>

      <img src={mess} alt="mess" className="pl-[532px] pt-[912px]" />

      <Link to={`/products/${firstCategoryId}`}>
        <button className="bg-orange rounded-[231px] w-[852px] h-[192px] text-[66px] font-black flex justify-center items-center text-white left-[114px] absolute top-[1419px]">
          Посмотреть меню
        </button>
      </Link>

      <img
        src={payment}
        alt={"payment"}
        className="absolute left-[395px] top-[1643px]"
      />
    </div>
  );
};
