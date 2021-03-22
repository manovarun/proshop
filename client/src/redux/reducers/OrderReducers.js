import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_RESET,
  ORDER_DETAILS_RESET,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';

export const OrderCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return { ...state, loading: true };
    case ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, success: true, order: payload.order };
    case ORDER_CREATE_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const OrderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  { type, payload }
) => {
  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true, success: false };
    case ORDER_DETAILS_SUCCESS:
      return { ...state, loading: false, order: payload.order, success: true };
    case ORDER_DETAILS_RESET:
      return {};
    case ORDER_DETAILS_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const OrderPayReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_PAY_REQUEST:
      return { ...state, loading: true };
    case ORDER_PAY_SUCCESS:
      return { ...state, loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { ...state, loading: false, error: payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const OrderListMyReducer = (
  state = { orders: [] },
  { type, payload }
) => {
  switch (type) {
    case ORDER_LIST_MY_REQUEST:
      return { ...state, loading: true };
    case ORDER_LIST_MY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        orders: payload.orders,
      };
    case ORDER_LIST_MY_FAIL:
      return { ...state, loading: false, error: payload };
    case ORDER_LIST_MY_RESET:
      return { ...state, loading: false, orders: [] };
    default:
      return state;
  }
};

export const OrderListReducer = (state = { orders: [] }, { type, payload }) => {
  switch (type) {
    case ORDER_LIST_REQUEST:
      return { ...state, loading: true };
    case ORDER_LIST_SUCCESS:
      return { ...state, loading: false, orders: payload.orders };
    case ORDER_LIST_FAIL:
      return { ...state, loading: false, orders: [], error: payload };
    case ORDER_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const OrderDeliverReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_DELIVER_REQUEST:
      return { ...state, loading: true, success: false };
    case ORDER_DELIVER_SUCCESS:
      return { ...state, loading: true, success: true, order: payload.order };
    case ORDER_DELIVER_FAIL:
      return { ...state, loading: false, error: payload, success: false };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};
