import React from "react";
import { useNavigate } from "react-router-dom";

function Welcoming() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 h-screen w-full bg-[url('/images/welcomingBannerReducedSize.webp')] bg-cover bg-center text-white items-center">
      <div className="flex flex-col justify-center items-start px-8 md:px-16">
        <div className="text-xl md:text-2xl font-bold bg-white text-black py-2 px-6 rounded-full shadow-xl animate-pulseColor mb-6">
          <p>
            Average Delivery Time:{" "}
            <span className="text-red-600">30 Minutes</span>
          </p>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-left mb-8 leading-tight">
          Flavors That Ignite, Moments That Delight
        </h1>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <button
            onClick={() => handleNavigation("/menu")}
            className="px-6 py-3 bg-transparent border-2 border-gray-600 text-gray-600 text-lg font-semibold rounded-md hover:bg-white hover:text-black transition duration-300 w-full md:w-auto"
          >
            View Menu
          </button>
          <button
            onClick={() => handleNavigation("/profile")}
            className="px-6 py-3 bg-transparent border-2 border-gray-600 text-gray-600 text-lg font-semibold rounded-md hover:bg-white hover:text-black transition duration-300 w-full md:w-auto"
          >
            Order Now
          </button>
        </div>
      </div>
      <div className="flex justify-center lg:h-auto lg:w-full h-3/4 w-auto -mt-6">
        <img
          src="/images/welcomePagePizza.webp"
          alt="Pizza"
          // className="w-4/5 md:w-full lg:w-4/5 h-3/4 rounded-lg shadow-lg"
          className=" sm:h-auto sm:w-auto h-full w-auto max-h-[60%] xl:max-h-full"
        />
      </div>
    </div>
  );
}

export default Welcoming;
