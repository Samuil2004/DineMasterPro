import React, { useEffect, useState } from "react";
import SearchBar from "./simpleComponents/SearchBar";
import OutputList from "./OutputList";
import { getUsersByRole } from "../services/controllers/UserController";
import { toast } from "react-toastify";
import PaginationPrevButton from "./simpleComponents/PaginationPrevButton";
import PaginationNextButton from "./simpleComponents/PaginationNextButton";
import RadioButton from "./simpleComponents/RadioButton";
function AdminCustomersView() {
  const [searchInput, setSearchInput] = useState("");
  const [searchOutput, setSearchOutput] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState("Manager");

  const [pageNumber, setPageNumber] = useState(1);
  const [totalNumberOfResults, setTotalNumberOfResults] = useState(0);
  const [selectedUser, setSelectedUser] = useState();

  const loadUsers = () => {
    getUsersByRole(selectedRole.toUpperCase(), searchInput, pageNumber)
      .then((response) => {
        setSearchOutput(response.users),
          setTotalNumberOfResults(response.totalResults);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const loadUserData = () => {
    setSelectedUser(
      searchOutput.find((user) => user.userId === selectedUserId)
    );
  };

  useEffect(() => {
    setPageNumber(1);
    loadUsers();
  }, [searchInput]);
  useEffect(() => {
    setSelectedUser();
    loadUsers();
  }, [pageNumber]);
  useEffect(() => {
    loadUsers();
  }, [selectedRole]);
  useEffect(() => {
    if (selectedUserId) {
      loadUserData();
    }
  }, [selectedUserId]);

  return (
    <div className="bg-gray-100 p-4 my-2">
      <h1 className="text-xl font-bold text-center mb-4">
        Admin Staff Members View
      </h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 h-full">
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-center items-center gap-2">
          <h2 className="text-lg font-semibold mb-2">Staff Members</h2>

          <SearchBar
            setSearchInput={setSearchInput}
            searchPlaceholder={"Search by surname"}
          />
          <div className="flex justify-center items-center content-center">
            <RadioButton
              title={"Manager"}
              setSelectedRole={setSelectedRole}
              selectedRole={selectedRole}
            />
            <RadioButton
              title={"Cook"}
              setSelectedRole={setSelectedRole}
              selectedRole={selectedRole}
            />
            <RadioButton
              title={"Delivery"}
              setSelectedRole={setSelectedRole}
              selectedRole={selectedRole}
            />
          </div>
          <OutputList
            output={searchOutput}
            setSelectedUserId={setSelectedUserId}
          />
          {searchOutput.length > 0 ? (
            <div className="flex">
              {pageNumber == 1 ? (
                <></>
              ) : (
                <PaginationPrevButton
                  currentPageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                />
              )}
              {pageNumber == Math.ceil(totalNumberOfResults / 10) ? (
                <></>
              ) : (
                <PaginationNextButton
                  currentPageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                />
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="grid grid-rows-2 gap-4">
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
                    <strong>Role:</strong> {selectedUser.userRole}
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
