import { Outlet, Navigate } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import Navb from "./Navb";
import FooterComponent from "./FooterComponent";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SplashPage from "../pages/SplashPage";
import ScrollButton from "./ScrollButton ";
// import ScrollToTop from "../utils/ScrollToTop";


const ProtectedRoutesComponent = ({ admin }) => {
  const [isAuth, setIsAuth] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/get-token");
        if (response.data.isAdmin === true) {
          setIsAuth("admin");
        } else {
          setIsAuth(response.data.token);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuth) {
      localStorage.setItem("isAuth", isAuth);
    }
  }, [isAuth]);

  if (isLoading) {
    return <div> </div>;
  } else if (isAuth === undefined || !isAuth) {
    return <SplashPage />;
  } else {
    return (
      <>
        <HeaderComponent />
        <Navb />
        <Outlet />
        <FooterComponent />
        <ScrollButton/>
        {/* <ScrollToTop /> */}

      </>
    );
  }
};

export default ProtectedRoutesComponent;




/* 
import { Outlet, Navigate } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import Navb from "./Navb";
import FooterComponent from "./FooterComponent";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SplashPage from "../pages/SplashPage";

const ProtectedRoutesComponent = ({ admin }) => {
  const [isAuth, setIsAuth] = useState();
  

  useEffect(() => {
    axios.get("/api/get-token").then(function (data) {
      if (data.data.isAdmin === true) {
        setIsAuth('admin');
      } else {
        setIsAuth(data.data.token);
      }
      return isAuth;
    });
  }, [isAuth]);

console.log('isAuthFFFFFFFFFFFF', isAuth);

  if (isAuth === undefined) return <SplashPage />;


  return isAuth && admin && isAuth !== "admin" ? (
    <Navigate to="/login" replace={true} />
  ) : isAuth && admin ? (
    <>
      <HeaderComponent />
      <Navb />
      <Outlet />
      <FooterComponent />
    </>
  ) : isAuth && !admin ? (
    <>
      <HeaderComponent />
      <Navb />
      <Outlet />
      <FooterComponent />
    </>
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default ProtectedRoutesComponent;

*/