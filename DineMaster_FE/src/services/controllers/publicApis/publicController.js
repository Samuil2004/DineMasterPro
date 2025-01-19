import api from "./publicAxiosConfiguration";
import { handleApiError } from "../../apiErrorHandler";
import { setTokens } from "../../TokenManager";

function getAllVsibleItemsFromCategory(category) {
  console.log("DSDS");
  return api
    .get(`/items/categories/${category}?visibleInMenu=true`)
    .catch((error) => {
      throw new Error(handleApiError(error));
    });
}

function refreshToken(refreshToken) {
  return api
    .post(`/auth/tokens/refresh?refreshToken=${refreshToken}`)
    .then((response) => response.data)
    .then((tokens) => {
      setTokens(tokens);
      return tokens.accessToken;
    })
    .catch((error) => {
      throw new Error(handleApiError(error));
    });
}

function logIn(username, password) {
  return api
    .post("/auth/logIn", {
      username,
      password,
    })
    .then((response) => response.data)
    .then((tokens) => setTokens(tokens))
    .catch((error) => {
      const customMessages = {
        401: "Invalid email or password.",
      };
      throw new Error(handleApiError(error, customMessages));
    });
}
function handleForgottenPassword(email) {
  const body = {
    email: email,
  };
  return api
    .post(`/users/password/reset`, body)
    .then((response) => response.data)
    .catch((error) => {
      const customMessages = {
        404: "User with provided email was not found.",
      };
      throw new Error(handleApiError(error, customMessages));
    });
}

function signUpCustomer(
  firstName,
  lastName,
  password,
  confirmPassword,
  email,
  phoneNumber,
  country,
  city,
  postalCode,
  street
) {
  return api
    .post("/auth/customers", {
      firstName,
      lastName,
      password,
      confirmPassword,
      email,
      phoneNumber,
      country,
      city,
      postalCode,
      street,
    })
    .catch((error) => {
      const customMessages = {
        409: "User with provided email already exists.",
      };
      throw new Error(handleApiError(error, customMessages));
    });
}

export {
  getAllVsibleItemsFromCategory,
  refreshToken,
  logIn,
  signUpCustomer,
  handleForgottenPassword,
};
