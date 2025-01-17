import { OrderRelease } from "src/modules/OrderRelease/OrderRelease";
import info from "src/assets/info.svg";
import { useContactsStore } from "src/components/Contacts/store/contactsStore";
import { useNavigate } from "react-router-dom";

export const OrderReleasePage = () => {
  const { changeVisibility } = useContactsStore();
  const navigate = useNavigate();
  setTimeout(() => navigate("/"), 15000);
  return (
    <div className="w-[1080px]  h-[1920px] flex flex-col items-center">
      <OrderRelease />
      <div className="border-t-[5px] w-full flex justify-end absolute min-h-[170px] h-[80%] max-h-[220px] bottom-0 border-orange-500">
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
