import { Outlet } from "react-router-dom";
import { Contacts } from "src/components/Contacts/Contacts";
import Help from "src/components/Help";

export const Layout = () => {
  return (
    <div className="w-[1080px]  text-center relative  h-[1920px]">
      <Help />
      <Contacts />
      <main className=" w-[1080px] h-[1920px] border-[1px] border-black">
        <Outlet />
      </main>
    </div>
  );
};
