import { Link } from "react-router-dom";
import arrowLeft from "src/assets/arrow-left.svg";
import info from "src/assets/info.svg";
import { useContactsStore } from "../Contacts/store/contactsStore";

export const ActionFooter = () => {
  const { changeVisibility } = useContactsStore();

  return (
    <div className="w-full mt-[70px] h-full relative">
      <div className="border-t-[5px] w-full flex justify-between absolute min-h-[160px] h-[80%] max-h-[223px] bottom-0 border-layoutLine">
        <Link
          to={`/products/2`}
          className="flex w-[480px] ml-[46px] mt-[4%] rounded-[30px] h-[84px] justify-center items-center bg-buttonBg"
        >
          <img src={arrowLeft} alt={"return"} />
          <div className="font-bold text-[28px] mr-5">
            Вернуться к выбору товара
          </div>
        </Link>
        <img
          className="mt-[5%] mr-[46px] cursor-pointer w-[84px] h-[84px]"
          onClick={() => changeVisibility(true)}
          src={info}
          alt={"info"}
        />
      </div>
    </div>
  );
};
