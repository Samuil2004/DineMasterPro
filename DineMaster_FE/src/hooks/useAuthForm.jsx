import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  logIn,
  signUpCustomer,
} from "../services/controllers/publicApis/publicController";
import { createStaffMember } from "../services/controllers/UserController";
import { getClaims } from "../services/TokenManager";
import UserStore from "../services/stores/UserStore";
import CartStore from "../services/stores/CartStore";
import { toast } from "react-toastify";

export function useAuthForm(isLogin = true) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [staffMemberRole, setStaffMemberRole] = useState("");
  const navigate = useNavigate();
  const { updateUserId } = UserStore();

  const { loadItemsInCart, checkActiveCartForGivenCustomerId } = CartStore();
  const {
    phoneNumber,
    country,
    city,
    postalCode,
    street,
    addressIsValid,
    checkExistingAddress,
    updateUser,
    initializePerson,
    logOut,
    staffId,
    userRole,
  } = UserStore();

  const handleAuth = (data) => {
    if (isLogin) {
      logIn(data.usernameInput, data.passwordInput)
        .then(() => {
          const claims = getClaims();
          updateUserId(claims.userId);
          initializePerson().then(() => {
            const loggedInUserRole = claims.roles[0];
            switch (loggedInUserRole) {
              case "MANAGER":
                navigate("/admin/menu");
                break;
              case "CUSTOMER":
                navigate("/menu");
                checkActiveCartForGivenCustomerId().then((response) => {
                  if (response) {
                    loadItemsInCart().catch((error) => {
                      toast.error(error.message);
                    });
                  }
                });
                break;
              case "COOK":
                navigate("/kitchen/preparation");
                break;
              case "DELIVERY":
                navigate("/delivery/allOrders");
                break;
              default:
                navigate("/menu");
            }
            toast.success("Login Successfull!");
          });
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      signUpCustomer(
        data.firstNameInput,
        data.lastNameInput,
        data.passwordInput,
        data.confirmPasswordInput,
        data.usernameInput,
        data.userPhoneNumber,
        data.countryInput,
        data.cityInput,
        data.postalCodeInput,
        data.streetInput
      )
        .then(() => navigate("/logIn"))
        .catch((error) => toast.error(error.message));
    }
  };

  const handleCreateStaffMember = (data) => {
    createStaffMember(
      data.firstNameInput,
      data.lastNameInput,
      data.passwordInput,
      data.confirmPasswordInput,
      data.usernameInput,
      staffMemberRole
    )
      .then(() => navigate("/admin/menu"))
      .catch((error) => toast.error(error.message));
  };

  const handleUpdateUserProfile = (data) => {
    if (userRole === "CUSTOMER") {
      if (!addressIsValid) {
        checkExistingAddress().catch((error) => toast.error(error.message));
      } else {
        updateUser(
          data.firstNameInput,
          data.lastNameInput,
          data.passwordInput,
          data.confirmPasswordInput,
          data.usernameInput,
          data.userPhoneNumber,
          data.countryInput,
          data.cityInput,
          data.postalCodeInput,
          data.streetInput
        )
          .then(() => navigate("/login"))
          .catch((error) => {
            toast.error(error.message);
          });
      }
    } else {
      updateUser(
        data.firstNameInput,
        data.lastNameInput,
        data.passwordInput,
        data.confirmPasswordInput,
        data.usernameInput
      )
        .then(() => navigate("/login"))
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  const handleLogOut = () => {
    logOut(navigate, "/login").catch((error) => toast.error(error.message));
  };

  const isUserCustomer = () => {
    return userRole == "CUSTOMER";
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    confirmedPassword,
    setConfirmedPassword,
    handleAuth,
    isLogin,
    handleUpdateUserProfile,
    addressIsValid,
    checkExistingAddress,
    initializePerson,
    handleLogOut,
    staffId,
    userRole,
    isUserCustomer,
    handleCreateStaffMember,
    setStaffMemberRole,
    staffMemberRole,
  };
}
