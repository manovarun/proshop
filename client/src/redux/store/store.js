import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import Reducers from '../reducers/Reducers';

const middleware = [thunk];

const carItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const token = localStorage.getItem('token')
  ? JSON.parse(localStorage.getItem('token'))
  : '';

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : '';

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : '';

const initialState = {
  Cart: {
    cartItems: carItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  UserLogin: { userInfo: userInfoFromStorage, token },
  UserRegister: { userInfo: userInfoFromStorage, token },
};

const store = createStore(
  Reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
