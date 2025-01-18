import { create } from "zustand";
import {
  getUserById,
  updateCustomer,
  updateStaffMember,
  logoutUser,
} from "../controllers/UserController";
import {
  addressValidation,
  calculateDeliveryFee,
} from "../controllers/ValidationController";
import { getClaims, clear } from "../TokenManager";
const UserStore = create((set, get) => ({
  country: "",
  city: "",
  street: "",
  postalCode: "",
  phoneNumber: "",
  firstName: "",
  lastName: "",
  email: "",
  addressInputInProgress: false,
  addressIsValid: false,
  deliveryFee: "",
  errorMessage: "",
  userId: "",
  userRole: "",
  checkingIfAddressIsInDeliveryRange: false,
  staffId: "",
  confirmedPassword: "",

  initializePerson: () => {
    set({ errorMessage: "" });
    const role = get().getUserRole();
    return getUserById(get().getUserId()).then((response) => {
      const userData = response.data;

      set({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.username,
        userRole: userData.userRole,
        staffId: userData.staffId,
      });
      if (userData.userRole === "CUSTOMER") {
        set({
          phoneNumber: userData.phoneNumber,
          street: userData.address.street,
          country: userData.address.country,
          city: userData.address.city,
          postalCode: userData.address.postalCode,
          addressIsValid: true,
        });
      }
      return response.data;
    });
  },
  updateUser: (
    firstName,
    lastName,
    password,
    confirmPassword,
    email,
    phoneNumber = null,
    country = null,
    city = null,
    postalCode = null,
    street = null
  ) => {
    set({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    const role = get().getUserRole();
    if (role == "CUSTOMER") {
      set({
        phoneNumber: phoneNumber,
        country: country,
        city: city,
        postalCode: postalCode,
        street: street,
      });
      return updateCustomer(
        get().getUserId(),
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
      ).then(() => clear());
    } else {
      return updateStaffMember(
        get().getUserId(),
        firstName,
        lastName,
        password,
        confirmPassword,
        email,
        get().staffId
      ).then(() => clear());
    }
  },

  checkExistingAddress: () => {
    set({ addressIsValid: false });
    set({ errorMessage: "" });

    return addressValidation(
      get().street,
      get().city,
      get().postalCode,
      get().country
    ).then((response) => {
      if (response) {
        set({
          street: get().street,
          city: get().city,
          postalCode: get().postalCode,
          country: get().country,
          addressInputInProgress: true,
          addressIsValid: true,
          validatingAdcheckingIfAddressIsInDeliveryRangedressForDeliveryRange: true,
        });
      } else {
        set({ addressIsValid: false });
        set({ addressInputInProgress: false });
      }
    });
  },

  calculateDeliveryFee: () => {
    return calculateDeliveryFee(
      get().street,
      get().city,
      get().postalCode,
      get().country
    )
      .then((deliveryFee) => {
        set({
          deliveryFee: deliveryFee.toFixed(2),
          validatingAdcheckingIfAddressIsInDeliveryRangedressForDeliveryRange: false,
        });
      })
      .catch((error) => {
        set({
          errorMessage: error.message,
          validatingAdcheckingIfAddressIsInDeliveryRangedressForDeliveryRange: false,
        });
        throw error;
      });
  },

  updateUserId: (value) => {
    set({ userId: value });
  },
  updateConfirmedPassword: (value) => {
    set({ confirmedPassword: value });
  },
  updateUserRole: (value) => {
    set({ userRole: value });
  },

  updateCountry: (value) => {
    set({ country: value });
  },
  updateCity: (value) => {
    set({ city: value });
  },
  updateStreet: (value) => {
    set({ street: value });
  },
  updatePostalCode: (value) => {
    set({ postalCode: value });
  },
  updateAddressIsValid: (value) => {
    set({ addressIsValid: value });
  },
  updatePhoneNumber: (value) => {
    set({ phoneNumber: value });
  },
  updateAddressInputInProgress: (value) => {
    set({ addressInputInProgress: value });
  },
  logOut: (navigate, navigationPath) => {
    return logoutUser(get().getUserId()).then(() => {
      clear();
      set({
        country: "",
        city: "",
        street: "",
        postalCode: "",
        phoneNumber: "",
        firstName: "",
        lastName: "",
        email: "",
        addressInputInProgress: false,
        addressIsValid: false,
        deliveryFee: "",
        errorMessage: "",
        userId: "",
        userRole: "",
      });
      navigate(navigationPath);
    });
  },
  getUserId: () => {
    const claims = getClaims();
    get().updateUserId(claims.userId);
    return claims.userId;
  },
  getUserRole: () => {
    const claims = getClaims();
    get().updateUserRole(claims.roles[0]);
    set({ userRole: claims.roles[0] });
    return claims.roles[0];
  },
}));

export default UserStore;
