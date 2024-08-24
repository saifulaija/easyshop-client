
import { Outlet } from "react-router-dom";
import Header from "../shared/Header/Header";
import GoToTop from "../shared/GoToTop/GoToTop";
import Footer from "../shared/Footer/Footer";


const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header /> */}
      <div className="min-h-screen mt-[60px]">
        <Outlet />
      </div>
      <GoToTop />
      {/* <Footer /> */}
    </div>
  );
};

export default HomeLayout;
