import { Outlet, useLocation } from "react-router-dom";
import HeaderLayout from "../components/layout/HeaderLayout";
import FooterLayout from "../components/layout/FooterLayout";

function CustomerLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="bg-cover bg-center">
      <HeaderLayout />
      <div
        id="root"
        className={`min-h-screen ${
          isHomePage
            ? "w-screen max-w-none"
            : "px-4 mx-auto text-center max-w-[1280px]"
        }`}
      >
        <Outlet />
      </div>
      <FooterLayout />
    </div>
  );
}

export default CustomerLayout;
