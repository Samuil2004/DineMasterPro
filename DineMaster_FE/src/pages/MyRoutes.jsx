import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useStomp from "../hooks/useStomp";
import UserStore from "../services/stores/UserStore";
import {
  getOrdersForDeliveryPerson,
  updateOrderStatus,
} from "../services/controllers/OrdersController";
import { Link } from "react-router-dom";
import DeliveryBox from "../components/DeliveryBox";
import { useNavigate } from "react-router-dom";

function MyRoutes() {
  const { getUserId } = UserStore();
  const [userRole, setUserRole] = useState("");
  const [myRoutes, setMyRoutes] = useState([]);
  const { sendMessage, initialize } = useStomp();
  const navigate = useNavigate();

  const loadMyRoutes = () => {
    initialize(getUserId());

    getOrdersForDeliveryPerson(getUserId(), 1, 3)
      .then((response) => {
        if (response.data.allOrdersAssignedToToADeliveryPerson.length != 0) {
          setMyRoutes(response.data.allOrdersAssignedToToADeliveryPerson);
        } else {
          navigate("/delivery/allOrders");
        }
      })
      .catch((error) => {
        toast.error(error.message);
        navigate("/delivery/allOrders");
      });
  };
  useEffect(() => {
    loadMyRoutes();
    // initialize(getUserId());
    const intervalId = setInterval(() => {
      loadMyRoutes();
      //initialize(getUserId());
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const handleWebSocketStatus = (textForStatus, customerInOrderId) => {
    const message = { text: textForStatus, to: customerInOrderId };
    sendMessage(message);
  };

  const updateStatusOfOrder = (order, status, statusId, receiverId) => {
    if (statusId && receiverId) {
      handleWebSocketStatus(statusId, receiverId);
    }
    updateOrderStatus(order.orderId, status)
      .then(() => loadMyRoutes())
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      {myRoutes && myRoutes.length === 0 ? (
        <div className="h-36 flex text-center items-center">
          <p className="text-red-600 w-full text-3xl">No routes</p>
        </div>
      ) : (
        <>
          <div className="flex justify-start">
            <Link
              to="/delivery/allOrders"
              className={
                "h-10 w-[150px] content-center justify-self-end mt-2 text-white font-semibold rounded-full shadow hover:border hover:border-white bg-green-500 hover:bg-green-400"
              }
            >
              All Orders
            </Link>
          </div>
          <div
            className="min-h-[60vh] py-7 text-center grid 
              2xl:grid-cols-[repeat(4,288px)] 
              justify-center mx-10 gap-10
                xl:grid-cols-[repeat(3,288px)] 
                lg:grid-cols-[repeat(2,288px)] 
                lg:gap-10
                md:grid-cols-[repeat(1,384px)] 
                sm:grid-cols-[400px]"
          >
            {myRoutes.map((order, index) => (
              <DeliveryBox
                key={`${order.orderId}-${index}`}
                order={order}
                buttonText={"Delivered"}
                updateStatusOfOrder={updateStatusOfOrder}
                confirmationPanelText={"Please confirm order was delivered?"}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default MyRoutes;
