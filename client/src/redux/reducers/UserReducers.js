import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAIL,
  USER_GET_RESET,
} from '../constants/userConstants';

export const UserLoginReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: payload.user,
        token: payload.token,
      };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: payload };
    case USER_LOGOUT:
      return { ...state, loading: false, userInfo: null, token: null };
    default:
      return state;
  }
};

export const UserRegisterReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: payload.user,
        token: payload.token,
      };
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const UserDetailsReducer = (state = { user: {} }, { type, payload }) => {
  switch (type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, user: payload.user };
    case USER_DETAILS_FAIL:
      return { ...state, loading: false, error: payload };
    case USER_DETAILS_RESET:
      return { ...state, loading: false, user: {} };
    default:
      return state;
  }
};

export const UserUpdateProfileReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userInfo: payload.user,
      };
    case USER_UPDATE_PROFILE_FAIL:
      return { ...state, loading: false, error: payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const UserListReducer = (state = { users: [] }, { type, payload }) => {
  switch (type) {
    case USER_LIST_REQUEST:
      return { ...state, loading: true };
    case USER_LIST_SUCCESS:
      return { ...state, loading: false, users: payload.users };
    case USER_LIST_FAIL:
      return { ...state, loading: false, error: payload };
    case USER_LIST_RESET:
      return { ...state, loading: false, users: [] };
    default:
      return state;
  }
};

export const UserDeleteReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_DELETE_REQUEST:
      return { ...state, loading: true };
    case USER_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };
    case USER_DELETE_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const UserUpdateReducer = (state = { user: {} }, { type, payload }) => {
  switch (type) {
    case USER_UPDATE_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true, user: payload.user };
    case USER_UPDATE_FAIL:
      return { ...state, loading: false, error: payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const UserGetReducer = (state = { user: {} }, { type, payload }) => {
  switch (type) {
    case USER_GET_REQUEST:
      return { ...state, loading: true };
    case USER_GET_SUCCESS:
      return { ...state, loading: false, user: payload.user };
    case USER_GET_FAIL:
      return { ...state, loading: false, error: payload };
    case USER_GET_RESET:
      return { ...state, loading: false, user: {} };
    default:
      return state;
  }
};
