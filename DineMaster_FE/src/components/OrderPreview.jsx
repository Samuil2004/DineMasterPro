import { getImageForItemBoxMenu } from "../services/controllers/ImageController";
import CartStore from "../services/stores/CartStore";
import OrderProgressBar from "../components/OrderProgressBar";
import React, { useState, useEffect } from "react";
import Loader from "../components/states/Loader";

function OrderPreview() {
  const [loading, setLoading] = useState(true);

  const { cuttedName, loadOrderByOrderId, activeOrder } = CartStore();

  useEffect(() => {
    setLoading(true);
    loadOrderByOrderId()
      .then(() => setLoading(false))
      .catch((error) => toast.error(error.message));
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className=" bg-white m-3 p-0 justify-self-center max-w-[1200px] pb-10 px-2 rounded-xl">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_2fr] grid-rows-[auto_auto] md:grid-rows-[auto_auto_auto] gap-4">
        <div className="col-span-3 row-span-1 ">
          <p className="text-2xl underline">Order overview</p>{" "}
          {activeOrder.cart.selectedItems.map((item) => (
            <div className="flex flex-col w-full" key={item.selectedItemId}>
              <div className="h-12 w-full flex items-center relative mb-1 sm:px-3 ">
                {/* <button
                  className="h-1/2 bg-transparent border-none"
                  onClick={() => {
                    removeItemFromCart(
                      cart.cartId,
                      item.selectedItemId,
                      navigate,
                      "/menu"
                    ).catch((error) => toast.error(error.message));
                  }}
                >
                  <img
                    className="h-full p-0 mr-0"
                    src="/images/bin.png"
                    alt="Remove item"
                    height="20"
                    width="25"
                  />
                </button> */}
                <div className="flex h-4/5 max-w-[40px] ml-3">
                  {getImageForItemBoxMenu(
                    item.itemOfReference.itemId,
                    item.itemOfReference.itemImageVersion,
                    item.itemOfReference.itemImageUrl,
                    40,
                    38
                  )}
                </div>
                <p className="ml-3 text-xl">
                  {item.amount} x{" "}
                  {cuttedName(item.itemOfReference.itemName, 10)}
                </p>
                <p className="text-l font-bold absolute right-4">
                  €
                  {item.itemPrice
                    ? (item.itemPrice * item.amount).toFixed(2)
                    : (item.itemFromMenu.itemPrice * item.amount).toFixed(2)}
                </p>
              </div>
              {item.comment || item.itemCategory.categoryName === "PIZZA" ? (
                <div className="flex flex-col w-full  px-[90px] text-black -mt-3">
                  {item.itemCategory.categoryName === "PIZZA" && (
                    <>
                      <div className="flex">
                        <p className="px-[10px] ml-1  font-bold text-[14px]">
                          Size:
                        </p>
                        <p className="text-sm m-0">{item.sizes.size}</p>
                      </div>
                      <div className="flex">
                        <p className="px-[10px] ml-1  font-bold text-[14px]">
                          Crust:
                        </p>
                        <p className=" text-sm m-0">
                          {item.itemOfReference.base}
                        </p>
                      </div>
                    </>
                  )}
                  {item.comment && (
                    <>
                      <div className="flex">
                        <p className="px-[10px] ml-1  font-bold text-[14px]">
                          Comment:
                        </p>
                        <p className=" text-sm m-0">{item.comment}</p>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
          {/* {activeOrder.cart.selectedItems.map((item) => (
            <div className="flex flex-col w-full" key={item.selectedItemId}>
              <div
                className="h-12 w-full flex items-center relative mb-1 px-3 "
                key={item.selectedItemId}
              >
                <div className="flex h-4/5 max-w-[40px] ml-3">
                  {getImageForItemBoxMenu(
                    item.itemOfReference.itemId,
                    item.itemOfReference.itemImageVersion,
                    item.itemOfReference.itemImageUrl,

                    100,
                    100
                  )}
                </div>
                <p className="ml-3 text-xl">
                  {item.amount} x {cuttedName(item.itemOfReference.itemName)}
                </p>
                <p className="text-l font-bold absolute right-4">
                  €
                  {item.itemPrice
                    ? (item.itemPrice * item.amount).toFixed(2)
                    : (item.itemFromMenu.itemPrice * item.amount).toFixed(2)}
                </p>
              </div>
              {item.comment || item.itemCategory.categoryName === "PIZZA" ? (
                <div className="flex flex-col w-full  px-[90px] text-black -mt-3">
                  {item.itemCategory.categoryName === "PIZZA" && (
                    <>
                      <div className="flex">
                        <p className="px-[10px] ml-1  font-bold text-[14px]">
                          Size:
                        </p>
                        <p className="text-sm m-0">{item.sizes.size}</p>
                      </div>
                      <div className="flex">
                        <p className="px-[10px] ml-1  font-bold text-[14px]">
                          Crust:
                        </p>
                        <p className=" text-sm m-0">
                          {item.itemOfReference.base}
                        </p>
                      </div>
                    </>
                  )}
                  {item.comment && (
                    <>
                      <div className="flex">
                        <p className="px-[10px] ml-1  font-bold text-[14px]">
                          Comment:
                        </p>
                        <p className=" text-sm m-0">{item.comment}</p>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          ))} */}
          <div className="border-t border-t-[1px] border-t-[rgb(101,101,101)] w-full flex flex-col">
            {activeOrder.comments && (
              <>
                <div className="flex my-4 ">
                  <p className="px-[10px] ml-1 font-bold text-l">Comment:</p>
                  <p className=" text-l m-0">{activeOrder.comments}</p>
                </div>
              </>
            )}
            {/* <div className="flex justify-between px-14 text-l h-7 items-center">
              <p>Delivery fee:</p>
              <p>€ {activeOrder.deliveryFee.toFixed(2)}</p>
            </div>
            <div className="flex justify-between px-14 text-xl h-7 items-center">
              <p>Total price:</p>
              <p>
                €{" "}
                {(
                  Number(activeOrder.cart.price) +
                  Number(activeOrder.deliveryFee)
                ).toFixed(2)}
              </p>
            </div> */}
            <div className="flex justify-between sm:px-14 px-4 text-l h-7 items-center">
              <p>Delivery fee:</p>
              <p>€ {activeOrder.deliveryFee.toFixed(2)}</p>
            </div>
            <div className="flex justify-between sm:px-14 px-4 text-xl h-7 items-center">
              <p>Total price:</p>
              <p>
                €{" "}
                {(
                  Number(activeOrder.cart.price) +
                  Number(activeOrder.deliveryFee)
                ).toFixed(2)}
              </p>
            </div>
            <div className="sm:px-14 px-4 text-xs h-7 text-left text-gray-500 mb-2">
              <p>
                *Delivery fee has a starting price of 0.99 and additional fee
                based on the distance from the restaurant to the provided
                address
              </p>
            </div>
          </div>
          <OrderProgressBar orderStatusId={activeOrder.orderStatus.id} />
        </div>
      </div>
    </div>
  );
}

export default OrderPreview;
