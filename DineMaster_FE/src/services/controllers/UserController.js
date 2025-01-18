import axios from "axios";
import { setTokens } from "../TokenManager";
import api from "./AxiosConfiguration";
import { handleApiError } from "../apiErrorHandler";

function getUserById(userId) {
  return api.get(`/users/${userId}`).catch((error) => {
    throw new Error(handleApiError(error));
  });
}

function logoutUser(userId) {
  return api.post(`/auth/logout/${userId}`).catch((error) => {
    throw new Error(handleApiError(error));
  });
}
function getAllUserRoles() {
  return api.get(`/users/roles`).catch((error) => {
    throw new Error(handleApiError(error));
  });
}
function getUsersByRole(role, searchInput, pageNumber) {
  let url;
  if (searchInput) {
    url = `/users/getByRoleAndLastName/${role}?lastName=${searchInput}&pageNumber=${pageNumber}`;
  } else {
    url = `/users/getByRoleAndLastName/${role}?pageNumber=${pageNumber}`;
  }
  return api
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(handleApiError(error));
    });
}
function getUsersByRoleAndUsername(role, searchInput, pageNumber) {
  return api
    .get(
      `/users/getByRoleAndUsername/${role}?username=${searchInput}&pageNumber=${pageNumber}`
    )
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(handleApiError(error));
    });
}

function getOrdersForCustomer(customerId, pageNumber) {
  return api
    .get(`/users/${customerId}/orders?pageNumber=${pageNumber}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(handleApiError(error));
    });
}

function updateCustomer(
  userId,
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
  const body = {
    userId: userId,
    firstName: firstName,
    lastName: lastName,
    password: password,
    confirmPassword: confirmPassword,
    email: email,
    phoneNumber: phoneNumber,
    country: country,
    city: city,
    postalCode: postalCode,
    street: street,
  };
  return api.put(`/users/customers/${userId}`, body).catch((error) => {
    throw new Error(handleApiError(error));
  });
}

function updateStaffMember(
  userId,
  firstName,
  lastName,
  password,
  confirmPassword,
  email,
  staffId
) {
  const body = {
    userId: userId,
    firstName: firstName,
    lastName: lastName,
    password: password,
    confirmPassword: confirmPassword,
    email: email,
    staffId: staffId,
  };
  return api.put(`/users/staff/${userId}`, body).catch((error) => {
    throw new Error(handleApiError(error));
  });
}

function createStaffMember(
  firstName,
  lastName,
  password,
  confirmPassword,
  email,
  userRole
) {
  const body = {
    firstName: firstName,
    lastName: lastName,
    password: password,
    confirmPassword: confirmPassword,
    email: email,
    userRole: userRole,
  };
  return api.post(`/auth/staff`, body).catch((error) => {
    throw new Error(handleApiError(error));
  });
}
export {
  getUserById,
  updateCustomer,
  updateStaffMember,
  logoutUser,
  getAllUserRoles,
  createStaffMember,
  getUsersByRole,
  getUsersByRoleAndUsername,
  getOrdersForCustomer,
};
