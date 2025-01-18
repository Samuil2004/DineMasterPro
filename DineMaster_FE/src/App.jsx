import Menu from "./pages/Menu";
import Login from "./pages/Login";
import ManageItems from "./pages/ManageItems";
import ItemView from "./pages/ItemView";
import Preview from "./pages/Preview";
import CustomerLayout from "./layouts/CustomerLayout";
import AdminLayout from "./layouts/AdminLayout";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import EditItem from "./pages/EditItem";
import AddItem from "./pages/AddItem";
import KitchenLayout from "./layouts/KitchenLayout";
import KitchenView from "./pages/KitchenView";
import OrdersView from "./pages/OrdersView";
import { useState } from "react";
import ErrorPage from "./components/ErrorPage";
import RouteGuard from "./services/RouteGuard";
import NavigationInitializer from "./services/NavigationInitializer";
import Profile from "./pages/Profile";
import AdminMenu from "./pages/AdminMenu";
import AddStaffMember from "./pages/AddStaffMember";
import MyRoutes from "./pages/MyRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserStore from "./services/stores/UserStore";
import AdminDeliveryView from "./components/AdminDeliveryView";
import AdminCustomersView from "./components/AdminCustomersView";
import AdminStaffView from "./components/AdminStaffView";
import Welcoming from "./pages/Welcoming";
import ForgottenPassword from "./pages/ForgottenPassword";
function App() {
  const [kitchenNavigationButtonContent, setKitchenNavigationButtonContent] =
    useState("");
  const [headerNavigationPath, setHeaderNavigationPath] = useState("");
  return (
    <div className="App">
      <Router>
        <NavigationInitializer />
        <Routes>
          <Route path="/" element={<CustomerLayout />}>
            <Route path="/" element={<Welcoming />} />

            <Route path="/menu" element={<Menu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/forgottenPassword" element={<ForgottenPassword />} />

            <Route
              path="/preview"
              element={
                <RouteGuard allowedRoles={["CUSTOMER"]}>
                  <Preview />
                </RouteGuard>
              }
            />
            <Route path="/:category/:itemName/:itemId" element={<ItemView />} />
          </Route>
          <Route
            path="/profile"
            element={
              <RouteGuard allowedRoles={["MANAGER", "CUSTOMER", "DELIVERY"]}>
                <AdminLayout />
              </RouteGuard>
            }
          >
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route
            path="/admin"
            element={
              <RouteGuard allowedRoles={["MANAGER"]}>
                <AdminLayout />
              </RouteGuard>
            }
          >
            <Route path="/admin/manageItems" element={<ManageItems />} />
            <Route path="/admin/menu" element={<AdminMenu />} />
            <Route
              path="/admin/staffmembers/addnew"
              element={<AddStaffMember />}
            />
            <Route
              path="/admin/manage/deliveries"
              element={<AdminDeliveryView />}
            />
            <Route
              path="/admin/manage/customers"
              element={<AdminCustomersView />}
            />
            <Route
              path="/admin/manage/staffmembers"
              element={<AdminStaffView />}
            />
            <Route
              path="/admin/manageItems/:category/:itemNameUrl/:itemId"
              element={<EditItem />}
            />
            <Route path="/admin/manageItems/addItem" element={<AddItem />} />
          </Route>
          <Route
            path="/kitchen"
            element={
              <RouteGuard allowedRoles={["COOK"]}>
                <KitchenLayout
                  kitchenNavigationButtonContent={
                    kitchenNavigationButtonContent
                  }
                  headerNavigationPath={headerNavigationPath}
                />
              </RouteGuard>
            }
          >
            <Route
              path="/kitchen/preparation"
              element={
                <KitchenView
                  setButtonContent={setKitchenNavigationButtonContent}
                  setHeaderNavigationPath={setHeaderNavigationPath}
                />
              }
            />
            <Route
              path="/kitchen/orders"
              element={
                <OrdersView
                  setButtonContent={setKitchenNavigationButtonContent}
                  setHeaderNavigationPath={setHeaderNavigationPath}
                />
              }
            />
          </Route>
          <Route
            path="/delivery"
            element={
              <RouteGuard allowedRoles={["DELIVERY"]}>
                <AdminLayout />
              </RouteGuard>
            }
          >
            <Route
              path="/delivery/allOrders"
              element={
                <OrdersView
                  setButtonContent={setKitchenNavigationButtonContent}
                  setHeaderNavigationPath={setHeaderNavigationPath}
                />
              }
            />
            <Route path="/delivery/myRoutes" element={<MyRoutes />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
