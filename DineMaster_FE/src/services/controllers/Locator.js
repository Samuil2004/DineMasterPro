import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

function checkExistingAddress(street, city, postalCode, country) {
  const fullAddress = `${street}, ${city}, ${postalCode}, ${country}`;

  const nominatimURL = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    fullAddress
  )}&format=json&addressdetails=1`;

  return axios
    .get(nominatimURL)
    .then((response) => {
      if (response.data.length > 0) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      throw new Error("Address not found. Please check your input.");
    });
}

export { checkExistingAddress };
