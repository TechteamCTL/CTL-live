import ProductDetailsPageComponent from "./components/ProductDetailsPageComponent";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../redux/actions/cartActions";
import axios from "axios";

const getProductDetails = async (id) => {
  const { data } = await axios.get(`/api/products/get-one/${id}`);
  return data;
};

const ProductDetailsPage = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  const getUser = async () => {
    const { data } = await axios.get("/api/users/profile/" + userInfo._id);
    return data;
  };

  return (
    <ProductDetailsPageComponent
      getUser={getUser}
      addToCartReduxAction={addToCart}
      reduxDispatch={dispatch}
      getProductDetails={getProductDetails}
    />
  );
};

export default ProductDetailsPage;
