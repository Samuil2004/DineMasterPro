import { Outlet } from "react-router-dom";
import KitchenHeader from "../components/layout/KitchenHeader";
function KitchenLayout(props) {
  return (
    <div className="bg-cover min-h-screen bg-black bg-center">
      <KitchenHeader
        kitchenNavigationButtonContent={props.kitchenNavigationButtonContent}
        headerNavigationPath={props.headerNavigationPath}
      />
      <div className="flex-grow px-38 text-center">
        <Outlet />
      </div>
    </div>
  );
}
export default KitchenLayout;
