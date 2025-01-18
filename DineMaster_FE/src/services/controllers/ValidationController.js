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
        return response.data;
      }
      return false;
    })
    .catch((error) => {
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
      throw new Error(handleApiError(error, customMessages));
    });
}

export { addressValidation, calculateDeliveryFee };
