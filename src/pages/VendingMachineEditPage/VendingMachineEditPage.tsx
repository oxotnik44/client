import React from "react";
import { useParams } from "react-router-dom";
import { VendingMachineEdit } from "src/modules/FillingProducts/VendingMachineEdit";
export const VendingMachineEditPage: React.FC = () => {
  const { id } = useParams();

  return <VendingMachineEdit id={id} />;
};
