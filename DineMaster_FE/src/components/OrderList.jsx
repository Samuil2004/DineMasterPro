import React from "react";
import NavigationPanel from "./NavigationPanel";
const OrderList = ({
  orders,
  title,
  totalNumberOfOrders,
  allOrdersPageNumber,
  setAllOrdersPageNumber,
}) => {
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <div className="bg-gray-200 p-2 rounded-md h-64 overflow-y-auto">
          {orders.length !== 0 ? (
            orders.map((item) => (
              <div
                className="flex items-center bg-white p-2 mb-2 rounded-lg shadow-sm hover:bg-gray-100"
                key={item.orderId}
              >
                <img
                  src={
                    item.orderStatus.id === 4
                      ? "/icons/check.svg"
                      : "/icons/timerIconBlack.svg"
                  }
                  className="w-6 h-6 mr-3"
                  alt="Order status icon"
                />
                <div className="text-sm">
                  <p>
                    <strong>Order ID:</strong> {item.orderId}{" "}
                    <strong>Status:</strong> {item.orderStatus.statusName}
                  </p>
                  <p>
                    {item.customerWhoOrdered.lastName},{" "}
                    {item.customerWhoOrdered.address.street},{" "}
                    {item.customerWhoOrdered.address.city},{" "}
                    {item.customerWhoOrdered.address.postalCode}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No orders.</p>
          )}
        </div>
      </div>
      <NavigationPanel
        currentItems={orders}
        totalNumberOfItems={totalNumberOfOrders}
        pageNumber={allOrdersPageNumber}
        setPageNumber={setAllOrdersPageNumber}
      />
    </div>
  );
};

export default OrderList;
