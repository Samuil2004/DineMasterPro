import api from "./AxiosConfiguration";
import { handleApiError } from "../apiErrorHandler";

import * as classes from "../Classes";

function getAllItemsFromCategory(category) {
  const link = `/items/categories/${category}`;
  return api.get(link).catch((error) => {
    throw new Error(handleApiError(error));
  });
}

function getActiveCartByCustomerId(customerId) {
  return api.get(`/carts-active/${customerId}`).catch((error) => {
    throw new Error(handleApiError(error));
  });
}

function getItemById(id) {
  return api.get(`/items/${id}`).catch((error) => {
    throw new Error(handleApiError(error));
  });
}

function addItemToCart(itemId, customerId, quantity, comment) {
  const requestBody = {
    customerId: customerId,
    quantity: quantity,
    itemOfReferenceId: itemId,
    comment: comment,
    selectedItemId: itemId,
  };
  return api.post(`carts/item`, requestBody).catch((error) => {
    throw new Error(handleApiError(error));
  });
}

function addPizzaToCart(itemId, customerId, quantity, size, comment) {
  const requestBody = {
    customerId: customerId,
    quantity: quantity,
    itemOfReferenceId: itemId,
    comment: comment,
    pizzaSize: size,
  };
  return api.post(`/carts/pizza`, requestBody).catch((error) => {
    throw new Error(handleApiError(error));
  });
}

function deleteItemFromCart(cartId, selectedItemId) {
  return api
    .delete(`/cart/${cartId}/items/${selectedItemId}`)
    .catch((error) => {
      throw new Error(handleApiError(error));
    });
}
function deleteItemFromMenu(category, itemId) {
  return api.delete(`/items/${itemId}?category=${category}`).catch((error) => {
    const customMessages = {
      409: "There are active orders containing this item.",
      500: "There are active orders containing this item.",
    };
    throw new Error(handleApiError(error, customMessages));
  });
}
function deleteItemFromOrders(itemId) {
  return api.delete(`/items/${itemId}/orders`).catch((error) => {
    throw new Error(handleApiError(error));
  });
}

function checkOutCart(
  customerId,
  cart,
  comments,
  phoneNumber,
  country,
  city,
  postalCode,
  street
) {
  comments = comments.trim() === "" ? "No comments" : comments;
  const createOrderRequest = {
    customerId: customerId,
    cartId: cart.cartId,
    comments: comments,
    phoneNumber: phoneNumber,
    country: country,
    city: city,
    postalCode: postalCode,
    street: street,
  };
  return api
    .post(`/cart/${customerId}/checkout`, createOrderRequest)
    .catch((error) => {
      throw new Error(handleApiError(error));
    });
}

function updateItem(category, id, item) {
  const formData = new FormData();
  if (item.image) {
    if (item.image instanceof File) {
      formData.append("image", item.image);
    } else {
      throw new Error(
        "Invalid image format. Accepted formats are: .jpg, .jpeg, .png, .gif, .webp, .svg, .bmp, .tiff."
      );
    }
  }
  return api
    .put(`/items/${category}/${id}`, item)
    .then(() => {
      if (item.image) {
        return api.put(`/images/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      return;
    })
    .catch((error) => {
      const customMessages = {
        500: "Server error occured. Item is part of an active order, so it can not be updated at the moment. If you want to delete the item, you should clear this item from all orders.",
      };
      throw new Error(handleApiError(error, customMessages));
    });
}

const createItem = (category, item) => {
  console.log(item);
  const formData = new FormData();
  if (item.image instanceof File) {
    formData.append("image", item.image);
  } else {
    throw new Error(
      "Invalid image format. Accepted formats are: .jpg, .jpeg, .png, .gif, .webp, .svg, .bmp, .tiff."
    );
  }

  return api
    .post(`/items/${category}`, item)
    .then((response) => {
      return api.post(`/images/${response.data.itemId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    })
    .catch((error) => {
      throw new Error(handleApiError(error));
    });
};

export {
  getItemById,
  getAllItemsFromCategory,
  updateItem,
  createItem,
  getActiveCartByCustomerId,
  addItemToCart,
  addPizzaToCart,
  deleteItemFromCart,
  checkOutCart,
  deleteItemFromMenu,
  deleteItemFromOrders,
};
