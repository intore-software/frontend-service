import { SET_MESSAGE, CLEAR_MESSAGE } from "../../constants/authTypes";

const initialState = { message: "" };

export default function messageReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { ...state, message: payload };

    case CLEAR_MESSAGE:
      return { ...state, message: "" };

    default:
      return state;
  }
}