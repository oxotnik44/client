import help from "src/assets/help.svg";
import helpBlack from "src/assets/help-black.svg";
import { cn } from "src/lib/utils.ts";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import close from "src/assets/close.svg";
import { Modal } from "src/app/ui/Modal/Modal";
import { helpSteps } from "./helpTexts";

const Help = () => {
  const [visible, setVisible] = useState(false);

  const location = useLocation().pathname;

  const editPath = location.replace(
    /\/vending-machine\/edit(?:\/\d+)?$/,
    "/vending-machine/edit"
  );

  const home = editPath === "/";

  const filteredSteps = helpSteps.filter(
    (step) => !step.hiddenFor || !step.hiddenFor.includes(location)
  );

  return (
    <>
      <button
        onClick={() => setVisible(true)}
        className={cn(
          "w-[246px] left-[788px] z-10 top-[84px] absolute flex justify-center items-center h-[84px] rounded-[65px] text-[28px] font-bold",
          home ? "text-white bg-helpBgHome" : "text-black bg-helpBg"
        )}
      >
        <img src={home ? help : helpBlack} alt="help" />
        Помощь
      </button>

      <Modal setVisible={setVisible} visible={visible}>
        <div className="px-[70px] flex flex-col relative gap-[66px] pt-[92px] text-textGrey w-[788px] bg-white max-h-[80vh] overflow-y-auto rounded-[66px] pb-[40px]">
          {filteredSteps.map((step, index) => {
            const isEditPath = location.startsWith("/vending-machine/edit");

            // Отображаем только первые три шага для editPath
            if (isEditPath && index >= 3) {
              return null;
            }

            return (
              <div
                key={index}
                className="flex justify-start items-start h-auto"
              >
                {/* Показываем картинку только для basePath или первых 3 шагов для editPath */}
                {(index < 3 || !isEditPath) && step.img && (
                  <img src={step.img} alt={`help-step-${index + 1}`} />
                )}
                <div className="pl-[32px] font-bold w-[100%] text-[28px] text-start">
                  {location !== "/vending-machine" &&
                  !location.startsWith("/vending-machine/edit")
                    ? step.text.basePath
                    : step.text[location] ?? step.text.editPath}
                </div>
              </div>
            );
          })}
          <button
            className="absolute right-[33px] top-[33px]"
            onClick={() => setVisible(false)}
          >
            <img src={close} alt="close" />
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Help;
