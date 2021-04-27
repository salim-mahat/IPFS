import axios from "axios";

export const setToken = (token) => {
  const bearerToken = `Bearer ${token}`;
  axios.defaults.headers.common["authorization"] = bearerToken;
  sessionStorage.setItem("token", bearerToken);
};

export const getToken = () => {
  const token = sessionStorage.getItem("token");
  axios.defaults.headers.common["authorization"] = token;
  return token;
};

export const removeToken = () => {
  sessionStorage.removeItem("token");
};
