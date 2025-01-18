import React, { useState, useEffect } from "react";
import OrderBox from "../components/OrderBox";
import {
  getAllOrdersByStatus,
  updateOrderStatus,
  assignOrderToDeliveryPerson,
} from "../services/controllers/OrdersController";
import UserStore from "../services/stores/UserStore";
import DeliveryBox from "../components/DeliveryBox";
import { toast } from "react-toastify";
import useStomp from "../hooks/useStomp";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function OrdersView(props) {
  const [selectedCategory, setSelectedCategory] = useState();
  const [allOrders, setAllOrders] = useState([]);
  const [userRole, setUserRole] = useState("");
  const { getUserRole } = UserStore();
  const { sendMessage, initialize, checkIfThereIsUnderlyingStomConnection } =
    useStomp();
  const { getUserId } = UserStore();
  const navigate = useNavigate();
  const [renderAgain, setRenderAgain] = useState(true);

  const loadOrders = (statuses, isTakenForDelivery) => {
    const promises = statuses.map((status) =>
      getAllOrdersByStatus(status, isTakenForDelivery)
    );

    Promise.all(promises)
      .then((responses) => {
        const allOrders = responses.flatMap(
          (response) => response.data.allOrders
        );

        setAllOrders(allOrders);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const checkWhatOrdersToRenderBasedOnRole = () => {
    const roleOfUser = getUserRole();
    if (roleOfUser === "COOK") {
      setUserRole(roleOfUser);
      props.setButtonContent("Go to kitchen");
      props.setHeaderNavigationPath("/kitchen/preparation");
      loadOrders(["CHECKING_QUALITY", "Preparing"]);
    } else if (roleOfUser === "DELIVERY") {
      setUserRole(roleOfUser);
      loadOrders(["DELIVERING"], false);
    }
  };

  useEffect(() => {
    checkWhatOrdersToRenderBasedOnRole();
    if (!checkIfThereIsUnderlyingStomConnection()) {
      initialize(getUserId());
    }
    const intervalId = setInterval(() => {
      checkWhatOrdersToRenderBasedOnRole();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const handleWebSocketStatus = (textForStatus, customerInOrderId) => {
    const message = { text: textForStatus, to: customerInOrderId };
    sendMessage(message);
  };

  const assignOrderToBeDeliveredByDeliveryPerson = (order) => {
    assignOrderToDeliveryPerson(order.orderId, getUserId())
      .then(() => navigate("/delivery/myRoutes"))
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const checkItemsStatus = (order) => {
    const allItemsArePrepared = order.cart.selectedItems.every(
      (item) => item.statusOfPreparation.statusName === "PREPARED"
    );
    if (allItemsArePrepared) {
      if (order.orderStatus.statusName === "PREPARING") {
        const connection = checkIfThereIsUnderlyingStomConnection();
        if (!connection) {
          initialize(getUserId());
        }
        handleWebSocketStatus(3, order.customerWhoOrdered.userId);
        return updateOrderStatus(order.orderId, "CHECKING_QUALITY")
          .then(() => {
            return true;
          })
          .catch((error) => {
            toast.error(error.message);
            return false;
          });
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  const updateStatusOfOrder = (order, status, statusId, receiverId) => {
    if (statusId && receiverId) {
      handleWebSocketStatus(statusId, receiverId);
    }
    updateOrderStatus(order.orderId, status)
      .then(() => {
        checkWhatOrdersToRenderBasedOnRole();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      {userRole === "DELIVERY" && (
        <div className="flex justify-end">
          <Link
            to="/delivery/myRoutes"
            className={
              "h-10 w-[150px] content-center justify-self-end mt-2 text-white font-semibold rounded-full shadow hover:border hover:border-white bg-green-500 hover:bg-green-400"
            }
          >
            My Routes
          </Link>
        </div>
      )}
      {allOrders && allOrders.length === 0 ? (
        <div className="h-36 flex text-center items-center">
          <p className="text-red-600 w-full text-3xl">No orders</p>
        </div>
      ) : (
        <>
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
            {userRole === "COOK" &&
              allOrders.map((order, index) => (
                <OrderBox
                  key={`${order.orderId}-${index}`}
                  order={order}
                  checkItemsStatus={checkItemsStatus}
                  updateStatusOfOrder={updateStatusOfOrder}
                  //handleWebSocketStatus={handleWebSocketStatus}
                />
              ))}
            {userRole === "DELIVERY" &&
              allOrders.map((order, index) => (
                <DeliveryBox
                  key={`${order.orderId}-${index}`}
                  order={order}
                  assignOrderToBeDeliveredByDeliveryPerson={
                    assignOrderToBeDeliveredByDeliveryPerson
                  }
                  buttonText={"Get"}
                  confirmationPanelText={
                    "Please confirm getting the order. \n*Once taken, order can not be canceled"
                  }
                />
              ))}
          </div>
        </>
      )}
    </>
  );
}
export default OrdersView;
