import { useState, useEffect } from "react";
import { isThereAuthenticatedUser, getClaims } from "../services/TokenManager";

export const useUserRole = (firstCase, secondCase, roles) => {
  if (!isThereAuthenticatedUser()) {
    return firstCase;
  }

  const rolesArray = getClaims()?.roles || [];
  const userRole = rolesArray.length > 0 ? rolesArray[0] : null;
  if (roles && userRole) {
    if (rolesArray.some((role) => roles.includes(role))) {
      return secondCase;
    }
    return firstCase;
  }
  return firstCase;
};

export const userErrorNavigation = () => {
  if (!isThereAuthenticatedUser()) {
    return "/";
  }

  const rolesArray = getClaims()?.roles || [];
  const userRole = rolesArray.length > 0 ? rolesArray[0] : null;
  if (userRole) {
    switch (userRole) {
      case "MANAGER":
        return "/admin/menu";
        break;
      case "COOK":
        return "/kitchen/preparation";
        break;
      case "DELIVERY":
        return "/delivery/allOrders";
        break;
      default:
        return "/";
    }
  }
  return "/";
};
