import React, { useEffect, useState } from "react";
import SearchBar from "./simpleComponents/SearchBar";
import OutputList from "./OutputList";
import { getUsersByRole } from "../services/controllers/UserController";
import { getOrdersForDeliveryPerson } from "../services/controllers/OrdersController";
import { toast } from "react-toastify";
import OrderList from "./OrderList";
import NavigationPanel from "./NavigationPanel";
function AdminDeliveryView() {
  const [searchInput, setSearchInput] = useState("");
  const [searchOutput, setSearchOutput] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [allOrdersForSelectedUserId, setAllOrdersForSelectedUserId] = useState(
    []
  );
  const [activeOrdersForSelectedUserId, setActiveOrdersForSelectedUserId] =
    useState([]);
  const [allOrdersPageNumber, setAllOrdersPageNumber] = useState(1);
  const [totalNumberOfOrders, setTotalNumberOfOrders] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalNumberOfResults, setTotalNumberOfResults] = useState(0);

  const loadUsers = () => {
    getUsersByRole("DELIVERY", searchInput, pageNumber)
      .then((response) => {
        setSearchOutput(response.users),
          setTotalNumberOfResults(response.totalResults);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const loadOrdersForSelectedUser = () => {
    getOrdersForDeliveryPerson(selectedUserId, 1, 3)
      .then((response) => {
        setActiveOrdersForSelectedUserId(
          response.data.allOrdersAssignedToToADeliveryPerson
        );
      })
      .catch((error) => {
        toast.error(error.message);
      });
    getOrdersForDeliveryPerson(selectedUserId, allOrdersPageNumber, 4)
      .then((response) => {
        setTotalNumberOfOrders(response.data.totalCount);
        setAllOrdersForSelectedUserId(
          response.data.allOrdersAssignedToToADeliveryPerson
        );
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    loadUsers();
    setAllOrdersPageNumber(1);
  }, []);

  useEffect(() => {
    loadUsers();
    setAllOrdersPageNumber(1);
  }, [searchInput, pageNumber]);

  useEffect(() => {
    if (selectedUserId) {
      setAllOrdersForSelectedUserId([]);
      setActiveOrdersForSelectedUserId([]);
      setAllOrdersPageNumber(1);
      loadOrdersForSelectedUser();
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (selectedUserId) {
      loadOrdersForSelectedUser();
    }
  }, [allOrdersPageNumber]);

  return (
    <>
      <div className="bg-gray-100 p-4 my-2">
        <h1 className="text-xl font-bold text-center mb-4">
          Admin Delivery View
        </h1>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 h-full">
          <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-center items-center gap-2">
            <h2 className="text-lg font-semibold mb-2">Delivery Personnel</h2>
            <SearchBar
              setSearchInput={setSearchInput}
              searchPlaceholder={"Search by surname"}
            />
            <OutputList
              output={searchOutput}
              setSelectedUserId={setSelectedUserId}
            />
            <NavigationPanel
              currentItems={searchOutput}
              totalNumberOfItems={totalNumberOfResults}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
          </div>

          <div className="grid grid-rows-2 gap-4">
            <OrderList
              orders={allOrdersForSelectedUserId}
              title={"All Orders"}
              totalNumberOfOrders={totalNumberOfOrders}
              allOrdersPageNumber={allOrdersPageNumber}
              setAllOrdersPageNumber={setAllOrdersPageNumber}
            />
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Active Orders</h2>
              <div className="bg-gray-200 p-2 rounded-md h-64 overflow-y-auto">
                {activeOrdersForSelectedUserId.map((item) => (
                  <div
                    className="flex items-center bg-white p-2 mb-2 rounded-lg shadow-sm hover:bg-gray-100"
                    key={item.orderId}
                  >
                    <img
                      src={"/icons/timerIconBlack.svg"}
                      className="w-6 h-6 mr-3"
                      alt="Timer icon"
                    />
                    <div className="text-sm">
                      <p>
                        <strong>Order ID:</strong> {item.orderId}
                      </p>
                      <p>
                        {item.customerWhoOrdered.lastName},{" "}
                        {item.customerWhoOrdered.address.street},{" "}
                        {item.customerWhoOrdered.address.city},{" "}
                        {item.customerWhoOrdered.address.postalCode}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDeliveryView;
