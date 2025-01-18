import React from "react";
import { NavLink } from "react-router-dom";
import AdminDeliveryView from "../components/AdminDeliveryView";
function AdminMenu() {
  return (
    <>
      <div
        className="min-h-[60vh] py-7 text-center grid 
             grid-cols-[repeat(auto-fit,minmax(300px,1fr))] 
             justify-center place-content-center gap-8 mx-10"
      >
        <div className="flex items-center justify-center">
          <NavLink
            to="/admin/staffmembers/addnew"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-64 h-64 rounded-full ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-blue-400 hover:text-white transition-colors duration-300`
            }
            data-cy={`button-select-add-staff`}
          >
            <span className="text-7xl">👤</span>
            <span className="text-lg font-semibold mt-2">Manage Staff</span>
          </NavLink>
        </div>

        <div className="flex items-center justify-center">
          <NavLink
            to="/admin/manageItems"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-64 h-64 rounded-full ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-blue-400 hover:text-white transition-colors duration-300`
            }
            data-cy={`button-select-manage-items`}
          >
            <span className="text-7xl">🍽️</span>
            <span className="text-lg font-semibold mt-2">Manage Menu</span>
          </NavLink>
        </div>
        <div className="flex items-center justify-center">
          <NavLink
            to="/admin/manage/deliveries"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-64 h-64 rounded-full ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-blue-400 hover:text-white transition-colors duration-300`
            }
            data-cy={`button-select-deliveries`}
          >
            <span className="text-7xl">🛵</span>
            <span className="text-lg font-semibold mt-2">Deliveries</span>
          </NavLink>
        </div>
        <div className="flex items-center justify-center">
          <NavLink
            to="/admin/manage/customers"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-64 h-64 rounded-full ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-blue-400 hover:text-white transition-colors duration-300`
            }
            data-cy={`button-select-customers`}
          >
            <span className="text-7xl">👤</span>
            <span className="text-lg font-semibold mt-2">Customers</span>
          </NavLink>
        </div>
        <div className="flex items-center justify-center">
          <NavLink
            to="/admin/manage/staffmembers"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-64 h-64 rounded-full ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-blue-400 hover:text-white transition-colors duration-300`
            }
            data-cy={`button-select-staff-members`}
          >
            <span className="text-7xl">👥</span>
            <span className="text-lg font-semibold mt-2">Staff</span>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default AdminMenu;
