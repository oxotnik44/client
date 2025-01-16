import React from "react";
import { Link, useParams } from "react-router-dom";
import { VendingMachineEdit } from "src/modules/FillingProducts/VendingMachineEdit";
export const VendingMachineEditPage: React.FC = () => {
  const { id } = useParams();

  return (
    <>
      <Link to="/">
        <button className="absolute left-[20px] top-20  bg-orange rounded-[50px] w-[300px] h-[80px] text-[18px] font-semibold text-white hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 shadow-lg">
          <p className="text-3xl"> На главную</p>
        </button>
      </Link>
      <Link to="/vending-machine">
        <button className="absolute top-20 left-96  bg-orange rounded-[50px] w-[300px] h-[80px] text-[18px] font-semibold text-white hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 shadow-lg">
          <p className="text-3xl"> Назад</p>
        </button>
      </Link>

      <VendingMachineEdit id={id} />
    </>
  );
};
