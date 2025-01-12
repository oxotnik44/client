import { useNavigate } from "react-router-dom";

export const OrderRelease = () => {
  const navigate = useNavigate();
  setTimeout(() => navigate("/"), 15000);
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-orange-50">
      <div className="bg-orange-100 shadow-2xl rounded-lg p-12 w-[80%] max-w-4xl text-center border-4 border-orange-500">
        <h1 className="text-5xl font-extrabold text-orange-700 mb-8">
          Заберите свой заказ!
        </h1>
        <p className="text-orange-600 text-3xl mb-12">
          Не забудьте наклеить штрих-код. Приятного дня!
        </p>
        <button
          className="mt-6 px-8 py-4 bg-orange-500 text-white text-lg font-semibold rounded-md shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300"
          onClick={() => navigate("/")} // Перенаправление на главную страницу
        >
          <p className="text-black text-2xl">Ok</p>
        </button>
      </div>
    </div>
  );
};
