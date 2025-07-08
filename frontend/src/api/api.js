import axios from "axios";
require("dotenv").config();
const api = axios.create({
  baseURL: process.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export default api;
