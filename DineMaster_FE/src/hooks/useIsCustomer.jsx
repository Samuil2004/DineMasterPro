import { useState, useEffect } from "react";
import { isThereAuthenticatedUser, getClaims } from "../services/TokenManager";

export const useIsCustomer = () => {
  const [isCustomer, setIsCustomer] = useState(false);

  useEffect(() => {
    if (isThereAuthenticatedUser()) {
      const userRoles = getClaims()?.roles || [];
      setIsCustomer(userRoles.includes("CUSTOMER"));
    } else {
      setIsCustomer(false);
    }
  }, []);

  return isCustomer;
};
