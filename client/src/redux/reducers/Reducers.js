import { combineReducers } from 'redux';
import { CartReducer } from './CartReducers';
import {
  OrderCreateReducer,
  OrderDeliverReducer,
  OrderDetailsReducer,
  OrderListMyReducer,
  OrderListReducer,
  OrderPayReducer,
} from './OrderReducers';
import {
  ProductCreateReducer,
  ProductDeleteReducer,
  ProductDetailsReducer,
  ProductListReducer,
  ProductReviewCreateReducer,
  ProductTopRatedReducer,
  ProductUpdateReducer,
} from './ProductReducers';
import {
  UserDeleteReducer,
  UserDetailsReducer,
  UserGetReducer,
  UserListReducer,
  UserLoginReducer,
  UserRegisterReducer,
  UserUpdateProfileReducer,
  UserUpdateReducer,
} from './UserReducers';

const Reducers = combineReducers({
  UserLogin: UserLoginReducer,
  UserRegister: UserRegisterReducer,
  UserDetails: UserDetailsReducer,
  UserUpdateProfile: UserUpdateProfileReducer,
  UserList: UserListReducer,
  UserDelete: UserDeleteReducer,
  UserUpdate: UserUpdateReducer,
  UserGet: UserGetReducer,
  ProductList: ProductListReducer,
  ProductDetails: ProductDetailsReducer,
  ProductDelete: ProductDeleteReducer,
  ProductUpdate: ProductUpdateReducer,
  ProductCreate: ProductCreateReducer,
  ProductReviewCreate: ProductReviewCreateReducer,
  ProductTopRated: ProductTopRatedReducer,
  Cart: CartReducer,
  OrderCreate: OrderCreateReducer,
  OrderDetails: OrderDetailsReducer,
  OrderPay: OrderPayReducer,
  OrderDeliver: OrderDeliverReducer,
  OrderListMy: OrderListMyReducer,
  OrderList: OrderListReducer,
});

export default Reducers;
