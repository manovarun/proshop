import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

// payload: { product: _id, name: name, image: image, price: price, countInStock: countInStock, qty,},

export const CartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  { type, payload }
) => {
  switch (type) {
    case CART_ADD_ITEM:
      const item = payload;
      const existingItem = state.cartItems.find(
        (x) => x.product === item.product
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existingItem.product ? item : x
          ),
        };
      }
      return { ...state, cartItems: [...state.cartItems, item] };

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== payload),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: payload };

    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: payload };

    default:
      return state;
  }
};
