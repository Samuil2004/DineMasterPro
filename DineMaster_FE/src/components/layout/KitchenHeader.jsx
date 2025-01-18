import { NavLink } from "react-router-dom";
import { clear } from "../../services/TokenManager";
function KitchenHeader(props) {
  return (
    <header className="flex pt-4 bg-black justify-between text-center pb-4">
      <NavLink to={`${props.headerNavigationPath}`} className="px-10">
        <button className="bg-yellow-500 h-auto w-auto px-4 py-2 text-black text-lg rounded-[10px] hover:bg-yellow-400">
          {props.kitchenNavigationButtonContent}
        </button>
      </NavLink>
      <NavLink to={"/login"} className="px-10">
        <button
          className=" bg-red-600 h-auto w-auto px-4 py-2 text-white text-lg rounded-[10px] hover:bg-blue-400"
          onClick={() => clear()}
        >
          Log out
        </button>
      </NavLink>
    </header>
  );
}
export default KitchenHeader;
