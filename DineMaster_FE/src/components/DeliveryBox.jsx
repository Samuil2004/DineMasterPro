import React, { useState, useEffect } from "react";
import ConfirmationDialog from "../components/states/ConfirmationDialog";
function DeliveryBox(props) {
  const [confirmationBoxVisible, setConfirmationBoxVisible] = useState(false);

  const onConfirm = () => {
    if (props.assignOrderToBeDeliveredByDeliveryPerson) {
      props.assignOrderToBeDeliveredByDeliveryPerson(props.order);
    }
    if (props.updateStatusOfOrder) {
      props.updateStatusOfOrder(
        props.order,
        "DELIVERED",
        5,
        props.order.customerWhoOrdered.userId
      );
    }
  };
  const onReject = () => {
    setConfirmationBoxVisible(false);
  };
  return (
    <>
      {confirmationBoxVisible && (
        <ConfirmationDialog
          visible={confirmationBoxVisible}
          setVisible={setConfirmationBoxVisible}
          onConfirm={onConfirm}
          onReject={onReject}
          content={props.confirmationPanelText}
        />
      )}
      <div
        key={props.order.orderId}
        className="bg-black h-[500px] lg:w-72 md:w-96 w-[400px] rounded-xl flex flex-col box-border text-black transition-transform transform hover:scale-105 hover:shadow-lg border border-2 border-white text-white text-left"
      >
        <div className="flex w-full px-3 items-center justify-between  border-b-2 border-[#d7d7d7]">
          <p className=" mb-[1px] text-[25px] m-0 overflow-hidden text-ellipsis whitespace-nowrap">
            {props.order.orderId}
          </p>
          <p className=" mb-[1px] text-[20px] m-0 overflow-hidden text-ellipsis whitespace-nowrap  text-[#FF1E00]">
            {props.order.cart.selectedItems.length}
          </p>
        </div>
        <div className="flex flex-col max-h-[70%] w-full items-start overflow-y-auto">
          <div className="flex border-b-2 w-full mt-2 border-[#d7d7d7]">
            <div className="flex items-center">
              <span className="text-3xl mr-2">📍</span>
            </div>
            <div>
              <p>{props.order.customerWhoOrdered.address.city}</p>
              <p>{props.order.customerWhoOrdered.address.street}</p>
              <p>{props.order.customerWhoOrdered.address.postalCode}</p>
            </div>
          </div>
          <div className="flex mt-2">
            <div className="flex items-center ">
              <span className="text-3xl mr-2">👤</span>
            </div>
            <div>
              <p>{props.order.customerWhoOrdered.firstName}</p>
              <p>{props.order.customerWhoOrdered.lastName}</p>
              <p>{props.order.customerWhoOrdered.phoneNumber}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-grow flex-col w-full justify-center border-t-2 border-[#d7d7d7]">
          <p className="px-[10px] mb-[1px]  text-[20px] m-0 w-11/12 ">
            Comments:
          </p>
          <p className="px-[10px] mb-[1px] text-[#77CDFF] text-[18px] m-0 w-11/12 ">
            {props.order.comments}
          </p>
        </div>
        <button
          onClick={() => {
            setConfirmationBoxVisible(true);
          }}
          className={`bg-[#59CE8F] flex border-2 border-blue-500 justify-center items-center text-white font-sans text-[17px] w-full h-[15%] min-h-12 rounded-b-[10px] hover:text-[rgb(95,95,253)] hover:bg-white `}
        >
          {props.buttonText}
        </button>
      </div>
    </>
  );
}
export default DeliveryBox;
