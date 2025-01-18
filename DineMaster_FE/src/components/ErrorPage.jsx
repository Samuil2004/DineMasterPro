import React from "react";
import { useNavigate } from "react-router-dom";
import { userErrorNavigation } from "../hooks/useHeaderNav";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen flex items-center flex-col justify-center lg:flex-row py-20 px-6 md:px-24 md:py-20 lg:py-10 gap-16 lg:gap-28">
      <div className="w-full lg:w-1/2">
        <img className="hidden lg:block" src="/images/errorImage.jpg" alt="" />
        <img
          className="hidden md:block lg:hidden"
          src="/images/errorImage.jpg"
          alt=""
        />
        <img className="md:hidden" src="/images/errorImage.jpg" alt="" />
      </div>
      <div className="w-full lg:w-1/2">
        <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800">
          OOPS!...Page not found
        </h1>
        <p className="py-4 text-base text-gray-800">
          Sorry, we couldn't find what you are looking for!
        </p>
        <p className="py-2 text-base text-gray-800">
          Please visit our menu to get where you need to go.
        </p>
        <button
          className="w-full lg:w-auto my-4 border rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
          onClick={() => navigate(userErrorNavigation())}
        >
          Go back to Menu
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
