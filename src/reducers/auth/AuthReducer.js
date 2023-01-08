import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,

  LOGOUT,

  ITIATE_RESET_SUCCESS,
  ITIATE_RESET_FAIL,

  LOADING
} from "../../constants/authTypes";
import { decrypt } from "../../services/crypto";

const token = JSON.parse(sessionStorage.getItem("token"));

let user;
if (token) {
  user = decrypt(sessionStorage.getItem("hash"));
}

const initialState = user
  ? { isLoading: false, isLoggedIn: true, user }
  : { isLoading: false, isLoggedIn: false, user: null };

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOADING:
      return {
        ...state,
        isLoading: true
      }
    case LOGIN_SUCCESS:

      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        user: null,
      };

    case ITIATE_RESET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: payload.email
      }
    case ITIATE_RESET_FAIL:
      return {
        ...state,
        isLoading: false,
        user: null
      }
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}