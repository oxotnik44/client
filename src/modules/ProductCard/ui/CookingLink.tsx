import { Link } from "react-router-dom";

// Тип для пропсов компонента CookingLink
export type CookingLinkProps = {
  to: string;
  text: string;
  icon: string;
  onClick?: (e: React.MouseEvent) => void; // Добавляем onClick как необязательное свойство
};

export const CookingLink: React.FC<CookingLinkProps> = ({
  to,
  text,
  icon,
  onClick,
}) => {
  return (
    <Link
      to={to}
      onClick={onClick} // Применяем onClick, если оно передано
      className="flex w-[280px] mt-[4%] rounded-[30px] min-h-[100px] justify-center items-center bg-orange text-white hover:bg-orange-600 transition duration-300"
    >
      <div className="font-bold text-[28px]">{text}</div>
      <img src={icon} alt="arrow icon" className="transform rotate-180" />
    </Link>
  );
};
