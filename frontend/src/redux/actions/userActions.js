import { LOGIN_USER, LOGOUT_USER } from "../constants/userConstants";
import axios from "axios";

export const setReduxUserState = (userCreated) => (dispatch) => {
  dispatch({
    type: LOGIN_USER,
    payload: userCreated,
  });
};

export const logout = () => (dispatch) => {
  // Remove access_token cookie
  document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Redirect to login page
  document.location.href = "/login";

  // Send logout request to server
  axios.get("/api/logout");

  // Remove user info from localStorage/sessionStorage
  localStorage.removeItem("userInfo");
  sessionStorage.removeItem("userInfo");

  // Remove other data from localStorage
  localStorage.removeItem("isAuth");
  localStorage.removeItem("authToken");

  // Dispatch logout action
  dispatch({ type: LOGOUT_USER });
};
