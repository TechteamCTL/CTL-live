import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

export const addToCart =
  (productId, qty, selectedStock) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/get-one/${productId}`);
    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: {
        productID: data._id,
        name: data.name,
        /* price: data.price, */
        image: data.images[0] ?? null,
        cartProducts: [{ ...selectedStock, quantity: qty }],
        ctlsku: data.ctlsku,
      },
    });
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
    console.log("addToCart-data", data);
  };
/* 
  export const reOrder =
  (orderId) => async (dispatch, getState) => {
    const { data } = await axios.get("/api/orders/user/" + orderId);
    const { cartItems } = data;
    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: {
        cartProducts: cartItems.map((cartItem) => ({
          productId: cartItem.productID,
          name: cartItem.name,
          image: cartItem.image.path ?? null,
          cartProducts: [...cartItem.cartProducts],
        })),
      },
    });
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
    console.log("reORDER-REORDER-data", cartItems);
  }; */

/*   export const reOrder = (orderId) => async (dispatch, getState) => {
  const { data } = await axios.get("/api/orders/user/" + orderId);
  const { cartItems } = data;

  // Create a new array with only the cartProducts arrays
  const cartProducts = cartItems.map((cartItem) => cartItem.cartProducts);

  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      cartProducts: cartProducts.flat(), // Flatten the array
    },
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  console.log("reORDER-REORDER-data", cartProducts);
}; */
 

// 这个是正式版本，回头解锁一下 
export const reOrder = (orderId) => async (dispatch, getState) => {
  const { data } = await axios.get("/api/orders/user/" + orderId);
  const { cartItems } = data;
  const reOrderProducts = cartItems.map((cartItem) => ({
    productId: cartItem.productID,
    name: cartItem.name,
    image: cartItem.image ?? null,
    cartProducts: [...cartItem.cartProducts],
  }));

  reOrderProducts.forEach((product) => {
    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: {
        productID: product.productId,
        name: product.name,
        image: product.image ?? null,
        cartProducts: product.cartProducts,
        ctlsku: product.ctlsku,
      },
    });
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  console.log("reORDER-REORDER-data", cartItems);
};

// V1
export const removeFromCart = (id, qty, price) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: { id: id, qty: qty, price: price },
  });
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const editQuantity = (id, qty) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.EDIT_QUANTITY,
    payload: { id: id, quantity: qty },
  });
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

// 追踪之后可以看到，add to cart 的信息，不单单存入了 redux，还有localStorage，然后清空cart就行
export const emptyCart = () => {
  // 不要用clear 要用 removeItem，这个 clear 会移除所有的 localStorage
  localStorage.removeItem("cart");
  return {
    type: actionTypes.EMPTY_CART,
    payload: [],
  };
};
