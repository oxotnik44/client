import info from "src/assets/info.svg";
import { useContactsStore } from "src/components/Contacts/store/contactsStore";
import { Cooking } from "src/modules/Cooking/Cooking";

export const CookingPage = () => {
  const { changeVisibility } = useContactsStore();

  return (
    <div className="h-full w-full flex flex-col items-center">
      <div className="w-full mt-[100px] h-full relative">
        <Cooking />
        <div className="border-t-[5px] w-full flex justify-end absolute min-h-[170px] h-[80%] max-h-[233px] bottom-0 border-layoutLine">
          <img
            className="mt-[4%] mr-[46px] cursor-pointer w-[84px] h-[84px]"
            onClick={() => changeVisibility(true)}
            src={info}
            alt={"info"}
          />
        </div>
      </div>
    </div>
  );
};
