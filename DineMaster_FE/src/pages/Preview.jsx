import React, { useState, useEffect } from "react";
import "/src/tailwindStyles.css";
import { getImageForItemBoxMenu } from "../services/controllers/ImageController";
import Loader from "../components/states/Loader";
import LocationLoader from "../components/states/LocationLoader";
import Map from "../components/Map";
import ErrorIcon from "../components/states/ErrorIcon";
import CartStore from "../services/stores/CartStore";
import UserStore from "../services/stores/UserStore";
import OrderPreview from "../components/OrderPreview";
import { useForm } from "react-hook-form";
import CountryInput from "../components/userFormInputs//CountryInput";
import CityInput from "../components/userFormInputs//CityInput";
import StreetInput from "../components/userFormInputs//StreetInput";
import PostalCodeInput from "../components/userFormInputs/PostalCodeInput";
import PhoneNumberInput from "../components/userFormInputs//PhoneNumberInput";
import ErrorAlert from "../components/states/ErrorAlert";
import { useNavigate } from "react-router-dom";
import CarLoader from "../components/states/CarLoader";
import { toast } from "react-toastify";

function Preview() {
  const navigate = useNavigate();
  const {
    cart,
    itemsInCart,
    loadItemsInCart,
    cuttedName,
    checkOutCartToOrder,
    removeItemFromCart,
    updateComments,
    checkActiveOrdersForGivenCustomerId,
    thereIsActiveOrder,
  } = CartStore();

  const {
    country,
    city,
    street,
    postalCode,
    firstName,
    lastName,
    email,
    initializePerson,
    deliveryFee,
    addressIsValid,
    addressInputInProgress,
    checkExistingAddress,
    errorMessage,
    calculateDeliveryFee,
    validatingAdcheckingIfAddressIsInDeliveryRangedressForDeliveryRange,
    phoneNumber,
  } = UserStore();

  const [loading, setLoading] = useState(true);
  const [mapIsRendered, setMapIsRendered] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({ mode: "onChange" });

  const loadData = () => {
    if (!loading) {
      setLoading(true);
    }
    checkActiveOrdersForGivenCustomerId()
      .then((response) => {
        if (!response) {
          loadItemsInCart().then(() => {
            initializePerson()
              .then((response) => {
                setValue("userPhoneNumber", response.phoneNumber);
                setValue("countryInput", response.address.country);
                setValue("cityInput", response.address.city);
                setValue("postalCodeInput", response.address.postalCode);
                setValue("streetInput", response.address.street);
                calculateDeliveryFee().catch((error) => {
                  toast.error(error.message);
                });
                setLoading(false);
              })
              .catch((error) => {
                toast.error(error.message);
                setLoading(false);
              });
          });
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  useEffect(() => loadData(), []);

  if (loading) {
    return <Loader />;
  }

  if (thereIsActiveOrder) {
    return <OrderPreview />;
  }
  const handleSubmitEvent = () => {
    if (!addressIsValid) {
      checkExistingAddress()
        .then(() => {
          calculateDeliveryFee().catch((error) => toast.error(error.message));
        })
        .catch((error) => toast.error(error.message));
    } else if (addressIsValid) {
      checkOutCartToOrder(phoneNumber, country, city, postalCode, street)
        .then(() => loadData())
        .catch((error) => toast.error(error.message));
    }
  };

  return (
    <>
      <div className=" bg-white m-3 p-0 justify-self-center max-w-[1200px] pb-10 px-2 rounded-xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_2fr] grid-rows-[auto_auto] md:grid-rows-[auto_auto_auto] gap-4">
          <div className="col-span-3 row-span-1 ">
            <p className="text-2xl underline">Order overview</p>
            {itemsInCart.map((item) => (
              <div className="flex flex-col w-full" key={item.selectedItemId}>
                <div className="h-12 w-full flex items-center relative mb-1 px-3 ">
                  <button
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
                  </button>
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
            ))}
            <div className="border-t border-t-[1px] border-t-[rgb(101,101,101)] w-full flex flex-col mb-1">
              <div className="flex justify-between px-14 text-l h-7 items-center">
                <p>Delivery fee:</p>
                <p>€ {deliveryFee}</p>
              </div>
              <div className="flex justify-between px-14 text-xl h-7 items-center">
                <p>Total price:</p>
                <p>€ {(Number(cart.price) + Number(deliveryFee)).toFixed(2)}</p>
              </div>
            </div>
            <div className="flex px-10 flex-col">
              <p className="text-left text-xl mt-3">Comments:</p>
              <input
                className="block border border-gray-300 rounded-md px-2 py-1 w-full lg:max-w-[50%] h-16"
                type="text"
                name="name"
                onChange={(e) => updateComments(e.target.value)}
                required
                placeholder="Comments:"
                minLength="4"
                maxLength="200"
                size="10"
              />
            </div>
          </div>

          <form
            onSubmit={handleSubmit(handleSubmitEvent)}
            className="col-span-2 row-span-2  p-3 content-start bg-custom-gray"
          >
            <p className="text-left text-2xl">
              {firstName} {lastName}
            </p>
            <p className="text-left text-l mt-5">{email}</p>
            <div className="w-1/2">
              <PhoneNumberInput
                register={register}
                errors={errors}
                populateData={true}
              />
            </div>
            <p className="text-left text-xl mt-3 font-bold">Delivery Adress</p>
            <div className=" flex mt-3 justify-between">
              <CountryInput
                register={register}
                errors={errors}
                populateData={true}
              />
              <CityInput
                register={register}
                errors={errors}
                populateData={true}
              />
            </div>
            <div className="flex mt-3 justify-around">
              <StreetInput
                register={register}
                errors={errors}
                populateData={true}
              />
              <PostalCodeInput
                register={register}
                errors={errors}
                populateData={true}
              />
            </div>
            <div className="flex mt-3 justify-center ">
              <button
                type="submit"
                className={`w-32 h-10 rounded-md ${
                  !addressIsValid
                    ? "bg-blue-500 hover:bg-green-400"
                    : "bg-gray-400"
                } text-white font-bold text-l`}
                disabled={addressIsValid}
              >
                Check address
              </button>
            </div>
            {validatingAdcheckingIfAddressIsInDeliveryRangedressForDeliveryRange ? (
              <CarLoader />
            ) : errorMessage ? (
              <ErrorAlert errorMessage={errorMessage} />
            ) : (
              <div className="flex mt-3 justify-center ">
                <button
                  type="submit"
                  className={`w-11/12 h-10 rounded-md ${
                    addressIsValid
                      ? "bg-green-500 hover:bg-green-400"
                      : "bg-gray-400"
                  } text-white font-bold text-l`}
                  disabled={!addressIsValid}
                >
                  Order
                </button>
              </div>
            )}
          </form>

          <div className="lg:col-span-1 md:row-span-2 lg:h-full h-80 col-span-2">
            {addressIsValid ? (
              <Map
                street={street}
                city={city}
                country={country}
                adressIsValid={addressIsValid}
                mapIsRendered={mapIsRendered}
                setMapIsRendered={setMapIsRendered}
              />
            ) : addressInputInProgress ? (
              <LocationLoader />
            ) : (
              <ErrorIcon />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Preview;
