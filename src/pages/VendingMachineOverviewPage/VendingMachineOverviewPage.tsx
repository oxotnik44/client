import React from "react";
import { Link } from "react-router-dom";
import { VendingMachineOverview } from "src/modules/FillingProducts/VendingMachineOverview/VendingMachineOverview";

export const VendingMachineOverviewPage: React.FC = () => {
  return (
    <div>
      <Link to="/">
        <button className="absolute top-20 left-[20px] bg-orange rounded-[50px] w-[300px] h-[80px] text-[18px] font-semibold text-white hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 shadow-lg">
          <p className="text-3xl"> На главную </p>
        </button>
      </Link>
      <VendingMachineOverview />
    </div>
  );
};
