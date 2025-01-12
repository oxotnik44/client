import { OrderRelease } from "src/modules/OrderRelease/OrderRelease";

export const OrderReleasePage = () => {
  return (
    <div className="h-full w-full flex flex-col items-center">
      <div className="w-full mt-[100px] h-full relative">
        <OrderRelease />
        <div className="border-t-[5px] w-full flex justify-end absolute min-h-[170px] h-[80%] max-h-[233px] bottom-0 border-orange-500"></div>
      </div>
    </div>
  );
};
