import { Outlet } from "react-router-dom";
import HeaderLayout from "../components/layout/HeaderLayout";
function AdminLayout() {
  return (
    <div className="bg-cover bg-center">
      <HeaderLayout role={"admin"} />
      <div
        id="root"
        className="min-h-screen px-4 max-w-[1280px] mx-auto text-center"
      >
        <Outlet />
      </div>
    </div>
  );
}
export default AdminLayout;
