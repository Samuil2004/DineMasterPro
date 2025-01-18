import axios from "axios";
import baseURL from "../BaseUrlConfiguration";

const api = axios.create({
  baseURL: baseURL,
  // baseURL: "https://dfc7-2a02-a45d-a162-0-903b-78cc-f951-4586.ngrok-free.app",
  // headers: {
  //   "ngrok-skip-browser-warning": "true",
  // },
});

export default api;
