import LoginPageComponent from "./components/LoginPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userActions";
import { fetchCartItemsLogin } from "../redux/actions/cartActions";

const loginUserApiRequest = async (email, password, doNotLogout, ipAddress) => {
  const { data } = await axios.post("/api/users/login", {
    email,
    password,
    doNotLogout,
    ipAddress,
  });
  if (data.userLoggedIn.doNotLogout)
    localStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
  else sessionStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
  return data;
};
const LoginPage = () => {
  const reduxDispatch = useDispatch();

  return (
    <LoginPageComponent
      loginUserApiRequest={loginUserApiRequest}
      reduxDispatch={reduxDispatch}
      setReduxUserState={setReduxUserState}
      fetchCartItemsLogin={fetchCartItemsLogin}
    />
  );
};

export default LoginPage;
