import { useState, useEffect } from "react";
import { isThereAuthenticatedUser, getClaims } from "../services/TokenManager";
import useCartStore from "../services/stores/CartStore";

export const useAuthUser = () => {
  const itemsInCart = useCartStore((state) => state.itemsInCart);
  const loadItemsInCart = useCartStore((state) => state.loadItemsInCart);
  useEffect(() => {
    if (!isThereAuthenticatedUser()) return;
    loadItemsInCart().catch((error) => {
      toast.error(error.message);
    });
  }, [loadItemsInCart]);

  if (itemsInCart.length > 1) {
    return true;
  }
  return false;
};
