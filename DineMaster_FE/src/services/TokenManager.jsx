import * as jwt_decode from "jwt-decode";
import { refreshToken } from "./controllers/publicApis/publicController";

let navigateFunction;

export function setNavigationFunction(navigate) {
  navigateFunction = navigate;
}

function getAccessToken() {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    const decodedToken = jwt_decode.jwtDecode(accessToken);
    const currentTime = Math.floor(Date.now() / 1000);

    //Check for 15 seconds in the future because it takes some time all the operations to happen
    if (decodedToken.exp > currentTime + 15) {
      return Promise.resolve(accessToken);
    }

    const refreshTokenValue = getRefreshToken();
    if (!refreshTokenValue) {
      clear();
      if (navigateFunction) {
        navigateFunction("/login");
      }
      return Promise.reject(new Error("No refresh token available."));
    }

    return refreshToken(refreshTokenValue)
      .then((newAccessToken) => {
        return newAccessToken;
      })
      .catch((error) => {
        clear();
        if (navigateFunction) {
          navigateFunction("/login");
        }
        return Promise.reject(error);
      });
  } else {
    return Promise.resolve(undefined);
  }
}

function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

function getClaims() {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return null;
  }
  try {
    return jwt_decode.jwtDecode(token);
  } catch (error) {
    return null;
  }
}

function setTokens(tokens) {
  localStorage.setItem("accessToken", tokens.accessToken);
  localStorage.setItem("refreshToken", tokens.refreshToken);
}

function clear() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

function checkLoggedInUser(allowedRoles) {
  const claims = getClaims();
  if (!claims) {
    return false;
  }
  if (!claims.roles.some((role) => allowedRoles.includes(role))) {
    return false;
  }
  return true;
}

function isThereAuthenticatedUser() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (!accessToken || !refreshToken) {
    return false;
  }
  const decodedRefreshToken = jwt_decode.jwtDecode(refreshToken);
  const currentTime = Math.floor(Date.now() / 1000);

  if (decodedRefreshToken.exp > currentTime) {
    return true;
  }

  return false;
}

export {
  getAccessToken,
  getClaims,
  checkLoggedInUser,
  clear,
  setTokens,
  getRefreshToken,
  isThereAuthenticatedUser,
};
