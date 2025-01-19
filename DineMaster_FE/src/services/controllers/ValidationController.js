import axios from "axios";
import api from "./AxiosConfiguration";
import { handleApiError } from "../apiErrorHandler";

function addressValidation(street, city, postalCode, country) {
  const requestBody = {
    country: country,
    city: city,
    postalCode: postalCode,
    street: street,
  };

  return api
    .post("/validation/address", requestBody)
    .then((response) => {
      if (response.data.isValid) {
        console.log(response.data);
        return response.data;
      }
      console.log(response.data);

      return false;
    })
    .catch((error) => {
      console.log("ERRROROROR");
      throw new Error(handleApiError(error));
    });
}

function calculateDeliveryFee(street, city, postalCode, country) {
  const requestBody = {
    country: country,
    city: city,
    postalCode: postalCode,
    street: street,
  };
  return api
    .post("/validation/delivery-fee", requestBody)
    .then((response) => {
      return response.data.deliveryFee;
    })
    .catch((error) => {
      const customMessages = {
        409: "Selected location is out of our delivery range! Please input another one within 20km from the restaurant location.",
      };
      console.log("THERE IS NA ERROR");
      //return 2.99;
      throw new Error(handleApiError(error, customMessages));
    });
}

export { addressValidation, calculateDeliveryFee };
