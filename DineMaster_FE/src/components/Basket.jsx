import React, { useState, useEffect } from "react";
import Cart from "./Cart";
import { useAuthUser } from "../hooks/useAuthUser";
import CartStore from "../services/stores/CartStore";
import { isThereAuthenticatedUser, getClaims } from "../services/TokenManager";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Basket() {
  const [thereIsActiveOrder, setThereIsActiveOrder] = useState(false);
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const itemsCount = CartStore((state) => state.itemsInCart.length);
  const navigate = useNavigate();
  const {
    showPopUp,
    hidePopUp,
    popUpVisible,
    loadItemsInCart,
    checkActiveCartForGivenCustomerId,
    handleAddingItemToBasket,
    checkActiveOrdersForGivenCustomerId,
  } = CartStore();
  const isUserAuthenticated = isThereAuthenticatedUser();

  useEffect(() => {
    if (isUserAuthenticated) {
      checkActiveOrdersForGivenCustomerId().then((response) => {
        if (response) {
          setThereIsActiveOrder(true);
        } else {
          checkActiveCartForGivenCustomerId().then((response) => {
            if (response) {
              loadItemsInCart().catch((error) => {
                toast.error(error.message);
              });
            }
          });
        }
      });
    } else {
    }
  }, [isUserAuthenticated, loadItemsInCart, popUpVisible]);
  return (
    <>
      {thereIsActiveOrder ? (
        <>
          <img
            className="w-auto max-h-14 cursor-pointer max-w-none"
            id="basketIcon"
            // src="/icons/basketIcon.svg"
            src="/icons/orderIcon.png"
            alt="Basket Icon"
            height="70"
            width="157"
            //onClick={() => setCartIsVisible(!cartIsVisible)}
            onClick={() => navigate("/preview")}
          />
        </>
      ) : (
        <>
          <img
            className="w-auto max-h-14 cursor-pointer max-w-none"
            id="basketIcon"
            src="/icons/basketIcon.svg"
            // src="/icons/orderIcon.png"
            alt="Basket Icon"
            height="70"
            width="157"
            //onClick={() => setCartIsVisible(!cartIsVisible)}
            onClick={() =>
              isUserAuthenticated
                ? popUpVisible
                  ? hidePopUp()
                  : showPopUp()
                : navigate("/login")
            }
          />
          {isUserAuthenticated && itemsCount > 0 && (
            <div
              style={{
                marginLeft: "-10px",
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                padding: "5px 10px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {itemsCount}
            </div>
          )}

          {popUpVisible && <Cart />}
        </>
      )}
    </>
  );
}

export default Basket;
