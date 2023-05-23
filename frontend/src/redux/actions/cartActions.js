import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

/* ****** ADD_TO_CART ****** */
export const addToCart =
  (productId, qty, selectedStock) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/get-one/${productId}`);
    const cartItems = [
      {
        productId: data._id,
        name: data.name,
        saleunit: data.saleunit,
        image: data.images[0].path ?? null,
        cartProducts: [{ ...selectedStock, quantity: qty }],
      },
    ];
    // console.log("cartAction的 加入购物车 数据", cartItems[0]);
    try {
      const { data } = await axios.post(`/api/cart/add`, { cartItems });
      // console.log("cartDDDDDDAATTTTTTT", cartItems[0]);
      dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: cartItems[0],
      });
      localStorage.setItem("cart", JSON.stringify(cartItems));
      // console.log("addToCart-data", data);
    } catch (error) {
      console.log(error);
    }
  };

/* ****** RE_ORDER ****** */
export const reOrder = (orderId) => async (dispatch, getState) => {
  const { data } = await axios.get("/api/orders/user/" + orderId);
  const { cartItems } = data;
  const reOrderProducts = cartItems.map((cartItem) => ({
    productId: cartItem.productId,
    name: cartItem.name,
    saleunit: cartItem.saleunit,
    image: cartItem.image ?? null,
    cartProducts: [...cartItem.cartProducts],
  }));
  try {
    const { data } = await axios.post(`/api/cart/add`, { cartItems });
    reOrderProducts.forEach((product) => {
      dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: {
          productId: product.productId,
          name: product.name,
          saleunit: product.saleunit,
          image: product.image ?? null,
          cartProducts: product.cartProducts,
          ctlsku: product.ctlsku,
        },
      });
    });
  } catch (error) {
    console.log(error);
  }
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  // console.log("reORDER-REORDER-data", cartItems);
};

/* ****** REMOVE_ITEM ****** */
export const removeFromCart =
  (id, qty, price) => async (dispatch, getState) => {
    try {
      const { data } = await axios.delete("/api/cart/delete/" + id);
      // console.log("购物车-移除产品",id);
      dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: { id: id, qty: qty, price: price },
      });
    } catch (error) {
      console.log(error);
    }
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  };

/* ****** EDIT_QUANTITY ****** */
export const editQuantity = (id, qty) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.EDIT_QUANTITY,
      payload: { id: id, quantity: qty },
    });
    
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
    const { data } = await axios.put("/api/cart/update/" + id, { quantity: qty });
    console.log("cartAction的 编辑购物车 数据", data);
  } catch (error) {
    console.log(error);
  }
};


/* ****** EMPTY_CART ****** */
export const emptyCart = () => async (dispatch) => {
  // 不要用clear 要用 removeItem，这个 clear 会移除所有的 localStorage
  try {
    const { data } = await axios.delete("/api/cart/remove");
    localStorage.removeItem("cart");
    dispatch({
      type: actionTypes.EMPTY_CART,
      payload: [],
    });
  } catch (error) {
    console.log(error);
  }
};

// Fetch cart items for logged in user
export const fetchCartItemsLogin = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/cart");
    const cartItems = data.data.cart.cartItems;
    // console.log("用户购物车Mongo data", cartItems);
    dispatch({
      type: actionTypes.FETCH_CART_ITEMS_LOGIN,
      payload: cartItems,
    });
    localStorage.setItem("cart", JSON.stringify(cartItems));
  } catch (error) {
    console.log(error);
  }
};

/* export const addToCart =
  (productId, qty, selectedStock) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/get-one/${productId}`);
    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: {
        productId: data._id,
        name: data.name,
        image: data.images[0] ?? null,
        cartProducts: [{ ...selectedStock, quantity: qty }],
        ctlsku: data.ctlsku,
      },
    });
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
    console.log("addToCart-data", data);
  }; */
