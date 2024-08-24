
import { Outlet } from "react-router-dom";
import GoToTop from "../shared/GoToTop/GoToTop";
const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
   
      <div className="min-h-screen mt-[60px]">
        <Outlet />
      </div>
      <GoToTop />
     
    </div>
  );
};

export default HomeLayout;
