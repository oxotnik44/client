import { SvgSelectorStage } from "src/shared/utils/svg-selector-stage";
import { useCookingStore } from "./store/cookingStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContactsStore } from "src/components/Contacts/store/contactsStore";

export const Cooking = () => {
  const navigate = useNavigate(); // Хук для навигации
  // Достаем состояние и методы из Zustand
  const { timeToCook, decrementTime, setTime } = useCookingStore();
  const { changeVisibility } = useContactsStore();

  useEffect(() => {
    let open = true;
    let localTime = 20; // Локальное время для отслеживания
    setTime(localTime); // Устанавливаем начальное значение времени

    const timer = async () => {
      while (localTime > 0 && open) {
        console.log("time decrement");
        decrementTime(1); // Уменьшаем глобальное состояние
        localTime -= 1; // Обновляем локальное время
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Когда время закончилось
      if (localTime === 0 && open) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Ждём 2 секунды
        changeVisibility(false);
        navigate("/orderRealese"); // Перенаправляем пользователя
      }
    };

    timer();

    return () => {
      open = false; // Завершаем таймер при размонтировании
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center">
      <div className="mt-[382px] w-[70%] font-bold text-[48px]">
        {`До свежей выпечки всего ${timeToCook} секунд`}
      </div>
      <div className="flex mt-[140px] items-center justify-center">
        <SvgSelectorStage
          id={`first-${
            timeToCook >= 20
              ? "first"
              : timeToCook >= 20 - 20 / 3
              ? "second"
              : "third"
          }`}
        />
        <div className="pb-[63px]">
          <SvgSelectorStage
            id={`line-${timeToCook >= 20 - 20 / 3 ? "first" : "second"}`}
          />
        </div>
        <SvgSelectorStage
          id={`second-${
            timeToCook >= 20 - 20 / 3
              ? "first"
              : timeToCook >= 20 - (20 / 3) * 2
              ? "second"
              : "third"
          }`}
        />
        <div className="pb-[63px]">
          <SvgSelectorStage
            id={`line-${timeToCook >= 20 - (20 / 3) * 2 ? "first" : "second"}`}
          />
        </div>
        <SvgSelectorStage
          id={`third-${
            timeToCook >= 20 - (20 / 3) * 2
              ? "first"
              : timeToCook > 0
              ? "second"
              : "third"
          }`}
        />
      </div>
    </div>
  );
};
