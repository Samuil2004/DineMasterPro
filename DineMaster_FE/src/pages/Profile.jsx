import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneNumberInput from "../components/userFormInputs//PhoneNumberInput";
import StreetInput from "../components/userFormInputs//StreetInput";
import CountryInput from "../components/userFormInputs//CountryInput";
import CityInput from "../components/userFormInputs//CityInput";
import PostalCodeInput from "../components/userFormInputs//PostalCodeInput";
import UsernameInput from "../components/userFormInputs/UsernameInput";
import LastNameInput from "../components/userFormInputs/LastNameInput";
import FirstNameInput from "../components/userFormInputs/FirstNameInput";
import PasswordInput from "../components/userFormInputs/PasswordInput";
import ConfirmPasswordInput from "../components/userFormInputs/ConfirmPasswordInput";
import { useAuthForm } from "../hooks/useAuthForm";
import { isThereAuthenticatedUser } from "../services/TokenManager";
import ErrorAlert from "../components/states/ErrorAlert";
import { useNavigate } from "react-router-dom";
import UserStore from "../services/stores/UserStore";

function Profile() {
  const { email } = UserStore();

  const {
    setFirstName,
    setLastName,
    setUsername,
    setPassword,
    setConfirmedPassword,
    handleUpdateUserProfile,
    addressIsValid,
    initializePerson,
    handleLogOut,
    staffId,
    isUserCustomer,
  } = useAuthForm(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({ mode: "onChange" });
  const password = watch("passwordInput");

  const onSubmit = (data, e) => {
    handleUpdateUserProfile(data);
  };

  const identifyUser = () => {
    if (!isThereAuthenticatedUser()) {
      navigate("/login");
    } else {
      initializePerson().then((response) => {
        setValue("usernameInput", response.username);
        setValue("firstNameInput", response.firstName);
        setValue("lastNameInput", response.lastName);
        setValue("usernameInput", response.username);
        setValue("userPhoneNumber", response.phoneNumber);
        if (response.userRole === "CUSTOMER") {
          setValue("countryInput", response.address.country);
          setValue("cityInput", response.address.city);
          setValue("postalCodeInput", response.address.postalCode);
          setValue("streetInput", response.address.street);
        }
      });
    }
  };

  useEffect(() => identifyUser(), []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center my-2">
      <div className=" w-full bg-[rgba(255,255,255,0.9)] border border-[rgba(255,255,255,0.2)] backdrop-blur-lg shadow-xl text-[rgba(110,110,110,0.9)] rounded-lg p-10">
        <div className="flex justify-end">
          <button
            type="button"
            className="h-10 w-[150px] justify-self-end bg-red-600 text-white rounded-md font-sans text-lg border-none flex justify-center items-center hover:bg-red-800 hover:text-white"
            onClick={() => handleLogOut()}
          >
            Log out
          </button>
        </div>
        <h1 className="text-3xl text-center mb-2 font-semibold">My Profile</h1>
        {!isUserCustomer() && (
          <h1 className="text-3xl text-center text-blue-500">{staffId}</h1>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className={`grid ${
            !isUserCustomer()
              ? "grid-cols-1"
              : "grid-cols-1 lg:grid-cols-2 lg:gap-4"
          } gap-0`}
        >
          <div className="col-span-1">
            <FirstNameInput
              register={register}
              errors={errors}
              populateData={true}
            />
            <LastNameInput
              register={register}
              errors={errors}
              populateData={true}
            />
            <UsernameInput
              register={register}
              errors={errors}
              populateData={true}
            />
            {isUserCustomer() && (
              <PhoneNumberInput
                register={register}
                errors={errors}
                populateData={true}
              />
            )}
            <PasswordInput register={register} errors={errors} />
            <ConfirmPasswordInput
              register={register}
              errors={errors}
              password={password}
            />
          </div>

          {isUserCustomer() && (
            <div className="col-span-1">
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
              <PostalCodeInput
                register={register}
                errors={errors}
                populateData={true}
              />
              <StreetInput
                register={register}
                errors={errors}
                populateData={true}
              />
              <button
                type="submit"
                className={`w-32 h-10 rounded-md mt-2 
                ${
                  !addressIsValid
                    ? "bg-blue-500 hover:bg-green-400"
                    : "bg-gray-400"
                } 
              
              text-white font-bold text-l`}
                disabled={addressIsValid}
              >
                Check address
              </button>
              {!addressIsValid && (
                <ErrorAlert
                  errorMessage={
                    "Provided address can not be found or has not beed validated!"
                  }
                />
              )}
            </div>
          )}
          <div
            className={`${
              isUserCustomer()
                ? "col-span-1 lg:col-span-1 lg:col-start-2"
                : "w-full"
            }`}
          >
            {isUserCustomer() ? (
              <button
                type="submit"
                className={`w-full h-12 mt-2 text-white font-semibold rounded-full shadow hover:bg-[rgba(186,186,186,0.9)] hover:border hover:border-white  ${
                  addressIsValid
                    ? "bg-green-500 hover:bg-green-400"
                    : "bg-gray-400"
                }`}
                disabled={!addressIsValid}
                data-cy={`button-click-apply-profile-changes`}
              >
                Update
              </button>
            ) : (
              <button
                type="submit"
                className={
                  "w-full h-12 mt-2 text-white font-semibold rounded-full shadow  hover:border hover:border-white bg-green-500 hover:bg-green-400"
                }
                data-cy={`button-click-apply-profile-changes`}
              >
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
