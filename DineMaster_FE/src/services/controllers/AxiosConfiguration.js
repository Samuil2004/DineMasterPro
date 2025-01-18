import { getAccessToken } from "../TokenManager";
import axios from "axios";
import baseURL from "./BaseUrlConfiguration";
const api = axios.create({
  baseURL: baseURL,

  // baseURL: "https://dfc7-2a02-a45d-a162-0-903b-78cc-f951-4586.ngrok-free.app",
  // headers: {
  //   "ngrok-skip-browser-warning": "true",
  // },
});

api.interceptors.request.use(
  (config) => {
    return getAccessToken()
      .then((token) => {
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
