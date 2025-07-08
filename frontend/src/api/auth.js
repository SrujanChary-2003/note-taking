import api from "./api";

export const signup = async (data) => api.post("/auth/signup", data);
export const requestOtp = async (data) => api.post("/auth/request-otp", data);
export const login = async (data) => api.post("/auth/signup", data); // OTP verify
export const logout = async () => api.post("/auth/logout");

export const saveUser = (user) =>
  localStorage.setItem("user", JSON.stringify(user));
export const getUser = () => JSON.parse(localStorage.getItem("user"));
export const clearUser = () => localStorage.removeItem("user");
