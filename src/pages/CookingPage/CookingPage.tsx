import info from "src/assets/info.svg";
import { useContactsStore } from "src/components/Contacts/store/contactsStore";
import { Cooking } from "src/modules/Cooking/Cooking";

export const CookingPage = () => {
  const { changeVisibility } = useContactsStore();

  return (
    <div className="w-[1080px]  h-[1920px] flex flex-col items-center">
      <Cooking />
      <div className="border-t-[5px] w-full flex justify-end  min-h-[170px] h-[80%] max-h-[223px]  border-layoutLine">
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
