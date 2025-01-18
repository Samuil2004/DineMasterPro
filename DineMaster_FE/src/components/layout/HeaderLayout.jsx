import Basket from "../Basket";
import DynamicNavLink from "./DynamicNavLink";
import { useIsCustomer } from "../../hooks/useIsCustomer";
import { getClaims } from "../../services/TokenManager";
import { NavLink } from "react-router-dom";
import { userErrorNavigation } from "../../hooks/useHeaderNav";
function HeaderLayout(props) {
  const isCustomer = useIsCustomer();
  const handleNavigation = () => {
    return userErrorNavigation();
  };
  return (
    <header className="sticky top-0 flex flex-row justify-around items-center bg-white text-gray-600 text-center p-4 z-50">
      <div className="  items-center">
        <NavLink
          className="flex justify-center items-center"
          to=""
          onClick={(e) => {
            e.preventDefault();
            const navigationPath = handleNavigation();
            if (navigationPath) {
              window.location.href = navigationPath;
            }
          }}
        >
          <img
            className="h-[70px] w-auto rounded-lg shadow-custom"
            src="/icons/logo.svg"
            alt="Logo"
            height="70"
            width="157"
          />
        </NavLink>
      </div>
      <div className="items-center justify-center">
        <NavLink
          className="flex justify-center items-center"
          to=""
          onClick={(e) => {
            e.preventDefault();
            const navigationPath = handleNavigation();
            if (navigationPath) {
              window.location.href = navigationPath;
            }
          }}
        >
          <img
            className="h-[70px] w-auto pt-2"
            src="/icons/logo33.jpg"
            alt="Menu"
            height="70"
            width="157"
          />
        </NavLink>
        <p className="text-gray-800 text-sm mt-0 mb-2 ">
          Flavors That Ignite, Moments That Delight!
        </p>
      </div>
      <div className="items-center flex">
        {getClaims()?.roles[0] === "MANAGER" ||
        getClaims()?.roles[0] === "DELIVERY" ? (
          <></>
        ) : (
          <Basket />
        )}

        <DynamicNavLink
          to={{
            default: "/login",
            roles: { "/profile": ["MANAGER", "CUSTOMER", "COOK", "DELIVERY"] },
          }}
        >
          <img
            className="lg:ml-10 ml-0 mr-0 h-full"
            src="/icons/accountIcon.svg"
            alt="Account Icon"
            data-cy="account-icon"
            height="20"
            width="50"
          />
        </DynamicNavLink>
      </div>
    </header>
  );
}
export default HeaderLayout;
