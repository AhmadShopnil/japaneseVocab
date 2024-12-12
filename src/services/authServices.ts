import { decodedToken } from "../utils/jwt";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "../utils/localStorage";

export const getUserInfo = () => {
  const token = getFromLocalStorage("accessToken");

  if (token) {
    const user = decodedToken(token);
    return user;
  }
};
export const saveUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage("accessToken", accessToken);
};

export const removeUser = () => {
  return removeFromLocalStorage("accessToken");
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage("accessToken");
  if (authToken) {
    return !!authToken;
  }
};
