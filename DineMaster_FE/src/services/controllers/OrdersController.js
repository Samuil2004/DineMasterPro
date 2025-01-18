import api from "./AxiosConfiguration";
import { handleApiError } from "../apiErrorHandler";

function getAllOrdersByStatus(status, isTakenForDelivery) {
  if (isTakenForDelivery !== undefined) {
    return api
      .get(`/orders/status/${status}?isTaken=${isTakenForDelivery}`)
      .catch((error) => {
        throw new Error(handleApiError(error));
      });
  }
  return api.get(`/orders/status/${status}`).catch((error) => {
    throw new Error(handleApiError(error));
  });
}

function getSelectedItemsByCategoryAndStatus(category, status) {
  return api
    .get(`/selected-items?category=${category}&status=${status}`)
    .catch((error) => {
      throw new Error(handleApiError(error));
    });
}

function checkActiveOrdersForCustomer(customerId) {
  return api.get(`/orders/${customerId}/active`).catch((error) => {
    throw new Error(handleApiError(error));
  });
}

function checkActiveCartForCustomer(customerId) {
  return api.get(`/cart/${customerId}/active`).catch((error) => {
    throw new Error(handleApiError(error));
  });
}

function getOrderByOrderId(orderId) {
  return api.get(`/orders/${orderId}`).catch((error) => {
    throw new Error(handleApiError(error));
  });
}

function updateSelectedItemStatus(selectedItemId) {
  return api.put(`/selected-item/${selectedItemId}`).catch((error) => {
    throw new Error(handleApiError(error));
  });
}

function updateOrderStatus(orderId, status) {
  return api
    .put(`/orders/${orderId}/${status}`)
    .then((response) => response.status)
    .catch((error) => {
      throw new Error(handleApiError(error));
    });
}

function assignOrderToDeliveryPerson(orderId, deliveryPersonId) {
  const body = {
    orderId: orderId,
    deliveryPersonId: deliveryPersonId,
  };
  return api.post(`/orders/assign`, body).catch((error) => {
    throw new Error(handleApiError(error));
  });
}

function getOrdersForDeliveryPerson(
  deliveryPersonId,
  pageNumber,
  statusId = null
) {
  let url;
  if (statusId != null) {
    url = `/orders/delivery/${deliveryPersonId}?pageNumber=${pageNumber}&statusId=${statusId}`;
  } else {
    url = `/orders/delivery/${deliveryPersonId}?pageNumber=${pageNumber}`;
  }

  return api.get(url).catch((error) => {
    const customMessages = {
      404: "There are no routes for this user at the moment.",
    };
    throw new Error(handleApiError(error, customMessages));
  });
}

export {
  getAllOrdersByStatus,
  getSelectedItemsByCategoryAndStatus,
  updateSelectedItemStatus,
  checkActiveOrdersForCustomer,
  updateOrderStatus,
  getOrderByOrderId,
  checkActiveCartForCustomer,
  assignOrderToDeliveryPerson,
  getOrdersForDeliveryPerson,
};
