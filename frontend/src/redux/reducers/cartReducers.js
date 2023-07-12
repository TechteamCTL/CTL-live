import * as actionTypes from "../constants/cartConstants";

const CART_INITIAL_STATE = {
  cartItems: [],
  itemsCount: 0,
  cartSubtotal: 0,
};

// 总体来说，就是把原来的redux加一个功能： post delete 数据 从cart数据库
// 然后就是 各种 传输的 数据 特别是array，搞不好就有个0，或者好几个0
// 就是多print数据，看看 数据的 format，后期要好好搞一下数据的 处理。

export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    // 当use log之后，会导向主页面，然后header也会渲染，顺便就把下面触发了，读取cart数据，然后写入本地
    case actionTypes.FETCH_CART_ITEMS_LOGIN:
      const fetchedCartItems = action.payload;
      const initialItemsCount = fetchedCartItems.reduce(
        (count, item) => count + Number(item.cartProducts[0].quantity),
        0
      );
      const initialCartSubtotal = fetchedCartItems.reduce(
        (subtotal, item) =>
          subtotal + item.cartProducts[0].quantity * item.cartProducts[0].price,
        0
      );
      const initialState = {
        ...state,
        cartItems: fetchedCartItems,
        itemsCount: initialItemsCount,
        cartSubtotal: initialCartSubtotal,
      };
      // console.log("FETCH_CART_ITEMS_LOGIN 数据", initialState);

      // localStorage.setItem("cart", JSON.stringify(fetchedCartItems));
      return initialState;

    // V1
    case actionTypes.ADD_TO_CART:
      const productBeingAddedToCart = action.payload;
      const currentState = { ...state };
      // Find the cartProduct with the same _id as the one being added to the cart
      // 找一下现在添加的产品，对比 cart 数据里面的产品，然后读取相对应的 index，用于下面的update操作
      // 然后 console.log 一下productBeingAddedToCart，发现里面有个 0 ，所以都给加上[0]。
      // 应该是我的cartActions里面 addToCart 改了之后，本地数据和网络数据同步的时候造成的
      
      // console.log("ADD_TO_CART的数据", productBeingAddedToCart);

      const cartProductIndex = state.cartItems.findIndex(
        (x) =>
        x.cartProducts[0]._id === productBeingAddedToCart.cartProducts[0]._id
        );
        // console.log("ADD_TO_CART的数据 的 index", cartProductIndex);      
      if (cartProductIndex >= 0) {
        // If the cartProduct exists, increase its quantity
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[cartProductIndex].cartProducts[0].quantity =
          Number(updatedCartItems[cartProductIndex].cartProducts[0].quantity) +
          Number(productBeingAddedToCart.cartProducts[0].quantity);

        currentState.cartItems = updatedCartItems;
      } else {
        // If the cartProduct doesn't exist, add a new cartItem to the cartItems array
        currentState.cartItems = [
          ...state.cartItems,
          {
            cartProducts: productBeingAddedToCart.cartProducts,
            ctlsku: productBeingAddedToCart.ctlsku,
            image: productBeingAddedToCart.image,
            name: productBeingAddedToCart.name,
            saleunit: productBeingAddedToCart.saleunit,
            price: productBeingAddedToCart.price,
            productId: productBeingAddedToCart.productId,
          },
        ];
      }

      // Update itemsCount and cartSubtotal
      let itemsCount = 0;
      let cartSubtotal = 0;

      currentState.cartItems.forEach((cartItem) => {
        cartItem.cartProducts.forEach((product) => {
          itemsCount += Number(product.quantity);
          cartSubtotal +=
            parseFloat(product.quantity) * parseFloat(product.price);
        });
      });

      currentState.itemsCount = itemsCount;
      currentState.cartSubtotal = cartSubtotal;
      // console.log("ADD_TO_CART的数据", currentState);

      return currentState;

    // V1
    case actionTypes.REMOVE_FROM_CART:
      const updatedCartItems = state.cartItems.filter(
        (x) => x.cartProducts[0]._id !== action.payload.id
      );

      const removedItem = state.cartItems.find(
        (x) => x.cartProducts[0]._id === action.payload.id
      );
    // console.log("移除购物车 reducer",action.payload.id );
      const remainingItemsCount = updatedCartItems.reduce(
        (acc, item) => acc + Number(item.cartProducts[0].quantity),
        0
      );

      const remainingCartSubtotal = updatedCartItems.reduce(
        (acc, item) =>
          acc + item.cartProducts[0].quantity * item.cartProducts[0].price,
        0
      );

      return {
        ...state,
        cartItems: updatedCartItems,
        itemsCount: remainingItemsCount,
        cartSubtotal: remainingCartSubtotal,
        removedItem: removedItem,
      };

    // In cartReducers.js
    case actionTypes.EDIT_QUANTITY:
      const updatedCartItemsQuantity = state.cartItems.map((item) => {
        if (item.cartProducts[0]._id === action.payload.id) {
          const newQuantity = Number(action.payload.quantity);
          return {
            ...item,
            cartProducts: [
              {
                ...item.cartProducts[0],
                quantity: newQuantity,
              },
            ],
          };
        } else {
          return item;
        }
      });

      const newItemsCount = updatedCartItemsQuantity.reduce(
        (acc, item) => acc + Number(item.cartProducts[0].quantity),
        0
      );

      const newCartSubtotal = updatedCartItemsQuantity.reduce(
        (acc, item) =>
          acc + item.cartProducts[0].quantity * item.cartProducts[0].price,
        0
      );

      return {
        ...state,
        cartItems: updatedCartItemsQuantity,
        itemsCount: newItemsCount,
        cartSubtotal: newCartSubtotal,
      };

    case actionTypes.EMPTY_CART:
      return {
        ...state,
        cartItems: action.payload,
        itemsCount: 0,
        cartSubtotal: 0,
      };
    default:
      return state;
  }
};
