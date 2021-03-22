import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const {
    data: { product },
  } = await axios.get(`/api/products/${id}`);

  const { _id, name, image, price, countInStock } = product;

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: _id,
      name: name,
      image: image,
      price: price,
      countInStock: countInStock,
      qty,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().Cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });

  localStorage.setItem('cartItems', JSON.stringify(getState().Cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch, getState) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => async (dispatch, getState) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
