import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getImageForItemBoxMenu } from "../services/controllers/ImageController";
import { NavLink } from "react-router-dom";
import CartStore from "../services/stores/CartStore";
import UserStore from "../services/stores/UserStore";
import { checkLoggedInUser } from "../services/TokenManager";
import { toast } from "react-toastify";

function Cart() {
  const {
    cart,
    itemsInCart,
    popUpVisible,
    loadItemsInCart,
    removeItemFromCart,
    cuttedName,
    checkActiveCartForGivenCustomerId,
    thereIsActiveCart,
    showPopUp,
    hidePopUp,
  } = CartStore();

  const { getUserId } = UserStore();
  const navigate = useNavigate();

  const loadData = () => {
    checkActiveCartForGivenCustomerId(getUserId)
      .then((response) => {
        if (response) {
          loadItemsInCart().catch((error) => {
            toast.error("Failed to load items in cart.");
          });
        } else {
          showPopUp();
        }
      })
      .finally(setTimeout(() => hidePopUp(), 5000));
  };

  useEffect(() => {
    if (!checkLoggedInUser("CUSTOMER")) {
      navigate("/login");
    } else {
      loadData();
    }
  }, []);

  return (
    <div>
      {popUpVisible && (
        <div className="absolute top-20 right-3 bg-white p-2 border border-[1px] border-white z-50 shadow-cart rounded-sm w-[350px]">
          <p className="mb-1 mt-2 text-xl text-black border-b-2 border-gray-600">
            Cart Details
          </p>

          {!thereIsActiveCart ? (
            <>
              <p className="mb-1 mt-2 text-xl text-black border-b-2 border-gray-600">
                Cart is empty
              </p>
            </>
          ) : (
            <>
              {itemsInCart.map((item) => (
                <div className="flex flex-col w-full" key={item.selectedItemId}>
                  <div
                    className={`h-12 w-full flex items-center relative ${
                      item.itemCategory.categoryName === "PIZZA"
                        ? "mb-0"
                        : "mb-1"
                    }`}
                  >
                    <button
                      className="h-1/2 bg-transparent border-none cursor-pointer"
                      onClick={() => {
                        removeItemFromCart(
                          cart.cartId,
                          item.selectedItemId
                        ).catch((error) => toast.error(error.message));
                      }}
                    >
                      <img
                        src="/images/bin.png"
                        className="h-full p-0 mr-0"
                        alt="Remove item"
                      />
                    </button>
                    <div className="flex h-4/5 max-w-[40px] pl-0">
                      {getImageForItemBoxMenu(
                        item.itemOfReference.itemId,
                        item.itemOfReference.itemImageVersion,
                        item.itemOfReference.itemImageUrl,
                        100,
                        100
                      )}
                    </div>

                    <p className="text-[19px] text-black ml-2">
                      {item.amount} x{" "}
                      {item.itemName
                        ? cuttedName(item.itemName)
                        : cuttedName(item.itemFromMenu.itemName)}
                    </p>
                    <p className="text-[17px] font-bold absolute right-3">
                      €
                      {item.itemPrice
                        ? (item.itemPrice * item.amount).toFixed(2)
                        : (item.itemFromMenu.itemPrice * item.amount).toFixed(
                            2
                          )}
                    </p>
                  </div>
                  {item.itemCategory.categoryName === "PIZZA" && (
                    <div className="flex flex-col w-full px-[60px] text-black -mt-3">
                      <div className="flex">
                        <p className="px-[10px] ml-1 font-bold text-[14px]">
                          Size:
                        </p>
                        <p className="text-sm m-0">{item.sizes.size}</p>
                      </div>
                      <div className="flex">
                        <p className="px-[10px] ml-1 font-bold text-[14px]">
                          Crust:
                        </p>
                        <p className="text-sm m-0">
                          {item.itemOfReference.base}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          <div className="border-t-[1px] px-5 border-gray-500 flex flex-col mb-2">
            <div className="flex justify-between text-[15px] h-[30px] items-center">
              <p>Starting delivery fee:</p>
              <p>€ 0,99</p>
            </div>
            <div className="flex justify-between text-[18px] h-[30px] items-center">
              <p>Total price:</p>
              <p>
                €{" "}
                {!thereIsActiveCart
                  ? "0.00"
                  : !cart.price
                  ? "0.00"
                  : cart.price.toFixed(2)}
              </p>
            </div>
          </div>
          {thereIsActiveCart ? (
            <NavLink
              to="/preview"
              className="h-[50px] w-full bg-custom-green rounded flex justify-between text-white text-[19px] items-center font-bold cursor-pointer"
              data-cy={"button-finish-order"}
            >
              <p className="px-[10px]">
                {thereIsActiveCart
                  ? `${itemsInCart.length} ${
                      itemsInCart.length === 1 ? "item" : "items"
                    } | € ${(cart.price + 0.99).toFixed(2)}`
                  : "€ 0.99"}
              </p>
              <p className="px-[10px] hover:bg-[rgb(0, 217, 98)]">
                Finish order
              </p>
            </NavLink>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}
export default Cart;
