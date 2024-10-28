import axios from "axios";
import { getAccessToken } from "./tokenAcess";
import { getauthorizedRole } from "./tokenAcess";

const api = axios.create({
  baseURL: "https://tourtravelbackend.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
    // "Content-Type": "multipart/form-data",
    Accept: "application/json",
    Authorization: getAccessToken(),
    authorizedRole: getauthorizedRole(),
  },
});

export default api;
