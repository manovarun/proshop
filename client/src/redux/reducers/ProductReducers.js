import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_RESET,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants';

export const ProductListReducer = (
  state = { products: [] },
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload.products,
        page: payload.page,
        pages: payload.pages,
      };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const ProductDetailsReducer = (
  state = { product: { reviews: [] } },
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true, success: false };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: payload.product,
        success: true,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        product: { reviews: [] },
        error: payload,
      };
    case PRODUCT_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const ProductDeleteReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true, success: false };
    case PRODUCT_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { ...state, loading: false, success: false, error: payload };
    default:
      return state;
  }
};

export const ProductCreateReducer = (
  state = { product: {} },
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true, success: false };
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: payload.product,
      };
    case PRODUCT_CREATE_FAIL:
      return { ...state, loading: false, success: false, error: payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const ProductUpdateReducer = (
  state = { user: {} },
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_UPDATE_REQUEST:
      return { ...state, loading: true, success: false };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: payload.product,
      };
    case PRODUCT_UPDATE_FAIL:
      return { ...state, loading: false, error: payload };
    case PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const ProductReviewCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { ...state, loading: true, success: false, message: '' };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: payload.message,
        review: payload.review,
      };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
        message: '',
      };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const ProductTopRatedReducer = (
  state = { products: [] },
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_TOP_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_TOP_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload.products,
        success: true,
      };
    case PRODUCT_TOP_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
      };
    default:
      return state;
  }
};
