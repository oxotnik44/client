// src/modules/help/helpTexts.ts

import first from "src/assets/first.svg";
import second from "src/assets/second.svg";
import third from "src/assets/third.svg";
import fourth from "src/assets/fourth.svg";

type HelpStepText = {
  [key: string]: JSX.Element | null; // Индексация по строкам
};

export const helpSteps = [
  {
    img: first,
    text: {
      basePath: (
        <>
          Выберите раздел меню <br />
          по вашему желанию
        </>
      ),
      "/vending-machine": <>На этом экране представлены ячейки с товарами</>,
      editPath: (
        <>
          Для затаривания товара нажмите кнопку затарить, введите, сколько
          товара хотите добавить, и нажмите "Затарить"
        </>
      ),
    } as HelpStepText, // Применяем типизацию
  },
  {
    img: second,
    text: {
      basePath: (
        <>
          Двигайте меню скроллом <br /> и выберите желаемый продукт
        </>
      ),
      "/vending-machine": (
        <>Выберите нужную ячейку, чтобы перейти к затариванию</>
      ),
      editPath: (
        <>
          Для замены товара нажмите "Заменить товар", выберите товар на замену и
          нажмите "Обновить товар"
        </>
      ),
    } as HelpStepText, // Применяем типизацию
  },
  {
    img: third,
    text: {
      basePath: (
        <>
          Нажмите "Приготовить", чтобы получить свой свежий только что
          приготовленный заказ
        </>
      ),
      "/vending-machine": <>На этом экране представлены ячейки с товарами</>,
      editPath: (
        <>
          Для удаления товара в ячейке должны быть продукты. Нажмите кнопку
          "Изъять товар", введите число, сколько товара хотите изъять, и нажмите
          "Изъять"
        </>
      ),
    } as HelpStepText, // Применяем типизацию
    hiddenFor: ["/vending-machine"],
  },
  {
    img: fourth,
    text: {
      basePath: <>Наслаждайтесь выпечкой</>,
      "/vending-machine": <>На этом экране представлены ячейки с товарами</>,
      editPath: null,
    } as HelpStepText, // Применяем типизацию
    hiddenFor: ["/vending-machine"],
  },
];
