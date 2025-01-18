import { create } from "zustand";
import {
  getActiveCartByCustomerId,
  addItemToCart,
  addPizzaToCart,
  deleteItemFromCart,
  checkOutCart,
} from "../controllers/ItemsController";
import {
  checkActiveOrdersForCustomer,
  checkActiveCartForCustomer,
  getOrderByOrderId,
} from "../controllers/OrdersController";
import * as classes from "../Classes";
import UserStore from "./UserStore";

const CartStore = create((set, get) => ({
  cart: [],
  itemsInCart: [],
  userId: "",
  popUpVisible: false,
  comments: "",
  thereIsActiveOrder: false,
  activeOrderId: "",
  activeOrder: [],
  thereIsActiveCart: false,
  itemAddedToCart: false,
  numberOfItemsInCart: "",
  getItemsCount: () => get().itemsInCart.length,

  showPopUp: () => {
    const popUpIsVisible = get().popUpVisible;
    if (!popUpIsVisible) {
      if (!popUpIsVisible) {
        set({ popUpVisible: true });
      }
      setTimeout(() => set({ popUpVisible: false }), 5000);
    }
  },

  hidePopUp: () => {
    if (get().popUpVisible) {
      set({ popUpVisible: false });
    }
  },

  loadItemsInCart: () => {
    const userId = get().getUserId();
    set({ userId: userId });
    return getActiveCartByCustomerId(userId).then((response) => {
      set({ cart: response.data.cart });
      set({ itemsInCart: response.data.cart.selectedItems });
    });
  },
  loadOrderByOrderId: () => {
    return getOrderByOrderId(get().activeOrderId).then((response) => {
      set({ activeOrder: response.data.order });
    });
  },

  removeItemFromCart: (cartId, selectedItemId, navigate, navigationPath) => {
    return deleteItemFromCart(cartId, selectedItemId).then(() => {
      if (get().itemsInCart.length != 1) {
        return get().loadItemsInCart();
      } else {
        set({ itemsInCart: [] });

        if (navigationPath) {
          navigate(navigationPath);
        }
        set({ popUpVisible: false });
      }
    });
  },

  checkActiveOrdersForGivenCustomerId: () => {
    const userId = get().getUserId();
    set({ userId: userId });
    return checkActiveOrdersForCustomer(get().userId).then((response) => {
      set({ thereIsActiveOrder: response.data.thereAreActiveOrders });
      if (response.data.thereAreActiveOrders) {
        set({ activeOrderId: response.data.activeOrderId });
      }
      return response.data.thereAreActiveOrders;
    });
  },

  checkActiveCartForGivenCustomerId: () => {
    const userId = get().getUserId();
    set({ userId: userId });
    return checkActiveCartForCustomer(userId).then((response) => {
      set({ thereIsActiveCart: response.data.thereIsActiveCart });
      return response.data.thereIsActiveCart;
    });
  },

  cuttedName: (name) => {
    if (name.length > 15) {
      return name.substring(0, 15) + "...";
    }
    return name;
  },

  checkOutCartToOrder: (phoneNumber, country, city, postalCode, street) => {
    return checkOutCart(
      get().userId,
      get().cart,
      get().comments,
      phoneNumber,
      country,
      city,
      postalCode,
      street
    ).then((response) => {});
  },

  updateComments: (value) => {
    set({ comments: value });
  },

  defineItemToPass: (category, selecteditem, amount, comment, selectedSize) => {
    if (category === "pizza") {
      return new classes.SelectedPizza(
        selecteditem.itemId,
        amount,
        selecteditem.itemName,
        selecteditem.itemImageVersion,
        selecteditem.itemPrice,
        selecteditem.ingredients,
        comment,
        selectedSize,
        selecteditem.base
      );
    } else {
      return selecteditem;
    }
  },

  handleAddingItemToBasket: (
    category,
    selecteditem,
    amount,
    comment,
    selectedSize
  ) => {
    const item = get().defineItemToPass(
      category,
      selecteditem,
      amount,
      comment,
      selectedSize
    );
    if (category === "pizza") {
      return addPizzaToCart(
        item.itemOfReferenceId,
        get().getUserId(),
        amount,
        item.sizes.size,
        comment
      )
        .then(() => {
          set({ itemAddedToCart: true });
        })
        .then(() =>
          get()
            .loadItemsInCart()
            .then(() => set({ popUpVisible: true }))
        )
        .finally();
    } else {
      return addItemToCart(item.itemId, get().getUserId(), amount, comment)
        .then(() => {
          set({ itemAddedToCart: true });
        })
        .then(() =>
          get()
            .loadItemsInCart()
            .then(() => set({ popUpVisible: true }))
        )
        .finally();
    }
  },
  getUserId: () => {
    const userId = UserStore.getState().getUserId();
    set({ userId: userId });
    return userId;
  },
}));

export default CartStore;
