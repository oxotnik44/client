import React from "react";
import { Link } from "react-router-dom";

interface CookingLinkProps {
  to: string;
  text: string;
  icon: string;
}

export const CookingLink: React.FC<CookingLinkProps> = ({ to, text, icon }) => {
  return (
    <Link
      to={to}
      className="flex w-[360px] mt-[4%] rounded-[30px] min-h-[100px] justify-center items-center bg-orange text-white hover:bg-orange-600 transition duration-300"
    >
      <div className="font-bold text-[28px]">{text}</div>
      <img src={icon} alt="arrow icon" className="transform rotate-180" />
    </Link>
  );
};
