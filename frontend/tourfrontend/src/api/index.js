import axios from "axios";
import { getAccessToken } from "../Auth";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: getAccessToken(),
  },
});

export default api;
