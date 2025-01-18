import React, { useEffect, useState } from "react";
import SearchBar from "./simpleComponents/SearchBar";
import OutputList from "./OutputList";
import {
  getUsersByRoleAndUsername,
  getOrdersForCustomer,
} from "../services/controllers/UserController";
import { toast } from "react-toastify";
import OrderList from "./OrderList";
import NavigationPanel from "./NavigationPanel";
function AdminCustomersView() {
  const [searchInput, setSearchInput] = useState("");
  const [searchOutput, setSearchOutput] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [allOrdersForSelectedUserId, setAllOrdersForSelectedUserId] = useState(
    []
  );
  const [allOrdersPageNumber, setAllOrdersPageNumber] = useState(1);
  const [totalNumberOfOrders, setTotalNumberOfOrders] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalNumberOfResults, setTotalNumberOfResults] = useState(0);
  const [selectedUser, setSelectedUser] = useState();

  const loadUsers = () => {
    getUsersByRoleAndUsername("CUSTOMER", searchInput, pageNumber)
      .then((response) => {
        setSearchOutput(response.users),
          setTotalNumberOfResults(response.totalResults);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const loadOrdersForSelectedUser = () => {
    setSelectedUser(
      searchOutput.find((user) => user.userId === selectedUserId)
    );
    getOrdersForCustomer(selectedUserId, allOrdersPageNumber)
      .then((response) => {
        setAllOrdersForSelectedUserId(response.allOrders);
        setTotalNumberOfOrders(response.totalCount);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  useEffect(() => {
    loadUsers();
  }, []);
  useEffect(() => {
    setPageNumber(1);
    loadUsers();
  }, [searchInput]);
  useEffect(() => {
    setSelectedUser();
    setAllOrdersForSelectedUserId([]);
    loadUsers();
  }, [pageNumber]);
  useEffect(() => {
    if (selectedUserId) {
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
    <div className="bg-gray-100 p-4 my-2">
      <h1 className="text-xl font-bold text-center mb-4">
        Admin Customer View
      </h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 h-full">
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-center items-center gap-2">
          <h2 className="text-lg font-semibold mb-2">Customers</h2>
          <SearchBar
            setSearchInput={setSearchInput}
            searchPlaceholder={"Search by email"}
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
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              User Details
            </h2>
            <div className="bg-gray-100 p-4 rounded-md h-64 overflow-y-auto border border-gray-200">
              {selectedUser ? (
                <ul className="text-sm space-y-2">
                  <li>
                    <strong>First Name:</strong> {selectedUser.firstName}
                  </li>
                  <li>
                    <strong>Last Name:</strong> {selectedUser.lastName}
                  </li>
                  <li>
                    <strong>Email:</strong> {selectedUser.email}
                  </li>
                  <li>
                    <strong>Phone Number:</strong> {selectedUser.phoneNumber}
                  </li>
                  <li>
                    <strong>Role:</strong> {selectedUser.userRole}
                  </li>
                  <li>
                    <strong>Address:</strong>{" "}
                    {`${selectedUser.address.street}, ${selectedUser.address.city}, ${selectedUser.address.postalCode}, ${selectedUser.address.country}`}
                  </li>
                </ul>
              ) : (
                <p className="text-gray-600 text-center">
                  No user selected. Please select a user to view details.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCustomersView;
