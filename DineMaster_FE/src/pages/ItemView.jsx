import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getItemById } from "../services/controllers/ItemsController";
import { useNavigate, useParams } from "react-router-dom";
import { checkLoggedInUser } from "../services/TokenManager";
import { getImageForItemView } from "../services/controllers/ImageController";
import Loader from "../components/states/Loader";
import Cart from "../components/Cart";
import CartStore from "../services/stores/CartStore";
import { toast } from "react-toastify";
import ErrorPage from "../components/ErrorPage";
function ItemView() {
  const location = useLocation();
  const { itemId, category } = useParams();

  const navigate = useNavigate();
  const { handleAddingItemToBasket, itemAddedToCart } = CartStore();

  const [amount, setAmount] = useState(1);
  const [comment, setComment] = useState("");
  const [selecteditem, setSelectedItem] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState({
    size: "small",
    additionalPrice: 0.0,
  });
  const [itemPrice, setItemPrice] = useState(0);
  const [customerId, setCustomerId] = useState(3);
  const [itemImageVersion, setItemImageVersion] = useState();
  const [itemImageUrl, setItemImageUrl] = useState();

  const [navigateToErrorPage, setNavigateToErrorPage] = useState(false);
  const handleSelectedSize = (size, selecteditem) => {
    setSelectedSize(size);
    setItemPrice(amount * (selecteditem.itemPrice + size.additionalPrice));
  };

  const loadSelectedItem = () => {
    setLoading(true);
    getItemById(itemId)
      .then((response) => {
        if (
          response.data.foundItem.itemCategory.categoryName.toLowerCase() !==
          category.toLowerCase()
        ) {
          setNavigateToErrorPage(true);
          return;
        }
        setSelectedItem(response.data.foundItem);
        setItemImageVersion(response.data.foundItem.itemImageVersion);
        setItemImageUrl(response.data.foundItem.itemImageUrl);

        if (category == "pizza") {
          handleSelectedSize(
            response.data.foundItem.sizes[0],
            response.data.foundItem
          );
        } else {
          setItemPrice(response.data.foundItem.itemPrice);
        }
      })
      .catch((error) => {
        toast.error(error.message);
        setNavigateToErrorPage(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!itemId || !category) {
      toast.error("Invalid item or category");
      setNavigateToErrorPage(true);
      return;
    }
    loadSelectedItem();
  }, []);

  function changeAmount(increase) {
    setAmount((prevAmount) => {
      const newAmount = increase
        ? Math.min(prevAmount + 1, 15)
        : Math.max(prevAmount - 1, 1);
      setItemPrice(
        newAmount * (selecteditem.itemPrice + selectedSize.additionalPrice)
      );
      return newAmount;
    });
  }

  if (loading) {
    return <Loader />;
  }

  const renderItemDetails = () => {
    switch (category) {
      case "pizza":
        return (
          <>
            <div className={"flex mt-2 mb-2 text-black"}>
              <h3 className=" text-xl mr-2">Base:</h3>
              <h3 className=" text-lg underline">{selecteditem.base}</h3>
            </div>
            <div className={"h-[100px] w-full flex justify-cneter"}>
              <div
                className={`h-[90%] w-1/3 flex flex-col items-center justify-center p-2 border-b-4 ${
                  selectedSize.size === selecteditem.sizes[0].size
                    ? "border-blue-500"
                    : "border-transparent"
                } hover:bg-gray-200`}
                onClick={() =>
                  handleSelectedSize(selecteditem.sizes[0], selecteditem)
                }
              >
                <img src="/icons/smallSize.svg" />
                <p className={"text-gray-600 mt-0"}>
                  {selecteditem.sizes[0].size}
                </p>
              </div>
              {selecteditem.sizes.length > 1 ? (
                <div
                  className={`h-[90%] w-1/3 flex flex-col items-center justify-center p-2 border-b-4 ${
                    selectedSize.size === selecteditem.sizes[1].size
                      ? "border-blue-500"
                      : "border-transparent"
                  } hover:bg-gray-200`}
                  onClick={() =>
                    handleSelectedSize(selecteditem.sizes[1], selecteditem)
                  }
                >
                  <img src="/icons/mediumSize.svg" />
                  <p className={"text-gray-600 mt-0"}>
                    {selecteditem.sizes[1].size}
                  </p>
                </div>
              ) : (
                <></>
              )}
              {selecteditem.sizes.length > 2 ? (
                <div
                  className={`h-[90%] w-1/3 flex flex-col items-center justify-center p-2 border-b-4 ${
                    selectedSize.size === selecteditem.sizes[2].size
                      ? "border-blue-500"
                      : "border-transparent"
                  } hover:bg-gray-200`}
                  onClick={() =>
                    handleSelectedSize(selecteditem.sizes[2], selecteditem)
                  }
                >
                  <img src="/icons/largeSize.svg" />
                  <p className={"text-gray-600 mt-0"}>
                    {selecteditem.sizes[2].size}
                  </p>
                </div>
              ) : (
                <></>
              )}
            </div>
          </>
        );
      case "pasta":
        return (
          <>
            <div className="flex items-center mt-3">
              <img src="/icons/weightIcon.svg" className={"w-10 mr-2"} />
              <p className={"text-[#58a4b0] text-xl"}>
                {selecteditem.weight} g
              </p>
            </div>
            <div className={"flex mt-3 mb-2 text-black"}>
              <h3 className=" text-xl mr-2">Pasta Type:</h3>
              <h3 className=" text-lg underline">{selecteditem.pastaType}</h3>
            </div>
          </>
        );
      case "salad":
        return (
          <>
            <div className="flex items-center mt-3">
              <img src="/icons/weightIcon.svg" className={"w-10 mr-2"} />
              <p className={"text-[#58a4b0] text-xl"}>
                {selecteditem.weight} g
              </p>
            </div>
          </>
        );
      case "beverage":
        return (
          <>
            <div className="flex items-center mt-3">
              <img src="/icons/liquidDrop.svg" className={"w-10 mr-2"} />
              <p className={"text-[#58a4b0] text-xl"}>{selecteditem.size} L</p>
            </div>
          </>
        );
      case "grill":
        return (
          <>
            <div className="flex items-center mt-3">
              <img src="/icons/weightIcon.svg" className={"w-10 mr-2"} />
              <p className={"text-[#58a4b0] text-xl"}>
                {selecteditem.weight} g
              </p>
            </div>
          </>
        );
      case "appetizer":
        return (
          <>
            <div className="flex items-center mt-3">
              <h3>Vegetarian:</h3>
              <img
                src={
                  selecteditem.isVegetarian
                    ? "/icons/vegetarian.svg"
                    : "/icons/cross.svg"
                }
                className="w-8 ml-2 h-4/5"
                alt="Vegetarian Status"
              />
            </div>
          </>
        );
      case "soup":
        return (
          <>
            <div className="flex items-center mt-3">
              <h3>Vegetarian:</h3>
              <img
                src={
                  selecteditem.isVegetarian
                    ? "/icons/vegetarian.svg"
                    : "/icons/cross.svg"
                }
                className="w-8 ml-2 h-4/5"
                alt="Vegetarian Status"
              />
            </div>
          </>
        );
      case "burger":
        return (
          <div className="flex items-center mt-3">
            <img src="/icons/weightIcon.svg" className={"w-10 mr-2"} />
            <p className={"text-[#58a4b0] text-xl"}>{selecteditem.weight} g</p>
          </div>
        );
      default:
        return <p className="text-gray-500">Item details not available.</p>;
    }
  };

  return (
    <>
      {navigateToErrorPage ? (
        <ErrorPage />
      ) : (
        <>
          <div className="flex justify-start mt-2 pl-2">
            <button
              type="button"
              className={
                "h-10 w-[150px] justify-self-end bg-[#58a4b0] text-black rounded-md font-sans text-lg border-none flex justify-center items-center hover:bg-black hover:text-white"
              }
              onClick={() => navigate(`/menu#${category}`)}
            >
              Back to Menu
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 bg-white m-2 p-0 rounded-lg mx-38">
            <div className="flex items-center justify-center md:mt-0 mt-2">
              {getImageForItemView(
                selecteditem.itemId,
                itemImageVersion,
                itemImageUrl
              )}
            </div>
            <div className="flex flex-col text-left p-5">
              <p className="text-[#337a80] text-3xl">{selecteditem.itemName}</p>
              <p className="text-gray-500">
                Ingredients: <br /> ({selecteditem.ingredients.join(", ")})
              </p>
              {renderItemDetails()}
              <div className="flex flex-col">
                <p className="text-left text-xl mt-3">Comments:</p>
                <input
                  className="block border border-gray-300 rounded-md px-2 py-1 w-full  h-16"
                  type="text"
                  name="name"
                  onChange={(e) => setComment(e.target.value)}
                  required
                  placeholder="Comments:"
                  minLength="4"
                  maxLength="200"
                  size="10"
                />
              </div>
              <div className="flex justify-between items-center py-4 sm:px-2">
                <div className="flex justify-between items-center">
                  <img
                    src="/icons/minus.svg"
                    onClick={() => changeAmount(false)}
                    alt="Decrease amount"
                    className="h-10 border border-gray-400 rounded-full p-1 hover:bg-gray-300"
                    data-cy={`button-decrease-amount`}
                    height="40"
                    width="40"
                  />
                  <h3 className="px-4 text-3xl" data-cy={`amount-label`}>
                    {amount}
                  </h3>
                  <img
                    src="/icons/plus.svg"
                    onClick={() => changeAmount(true)}
                    alt="Increase amount"
                    className="h-10 border border-gray-400 rounded-full p-1 hover:bg-gray-300"
                    data-cy={`button-increase-amount`}
                    height="40"
                    width="40"
                  />
                </div>
                <div
                  className="flex items-center justify-center h-16 sm:w-44 bg-[#609e29] rounded-md cursor-pointer hover:bg-[#63b21e] sm:mr-0 w-36"
                  onClick={() => {
                    if (!checkLoggedInUser("CUSTOMER")) {
                      navigate("/login");
                    } else {
                      handleAddingItemToBasket(
                        category,
                        selecteditem,
                        amount,
                        comment,
                        selectedSize
                      ).catch((error) => toast.error(error.message));
                    }
                  }}
                  data-cy={"button-add-item-to-cart"}
                >
                  <img
                    src="/images/addToBasket.png"
                    className="h-6 mr-2"
                    alt="Basked icon"
                    height="20"
                    width="30"
                  />
                  <h3 className="text-white text-2xl">
                    € {itemPrice.toFixed(2)}
                  </h3>
                </div>
              </div>
            </div>
            {/* {itemAddedToCart && <Cart />} */}
            {/* {popUpVisible && <Cart />} */}
          </div>
        </>
      )}
    </>
  );
}

export default ItemView;
