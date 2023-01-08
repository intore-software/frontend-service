import {
  ITIATE_RESET_FAIL,
  ITIATE_RESET_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  CLEAR_MESSAGE,
  LOADING,
} from "../../constants/authTypes";

import AuthService from "../../services/auth.service";
import { getLoginUserProfile } from '../../services/profile.service';

export const login = (loginData) => (dispatch) => {
  dispatch({
    type: LOADING,
  });

  dispatch({
    type: CLEAR_MESSAGE,
  })

  return AuthService.login(loginData).then(
    () => {
      getLoginUserProfile().then(
        (res) => {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: res },
          });
          return Promise.resolve();
        }
      ).catch(
        () => {
          dispatch({
            type: LOGIN_FAIL,
          });

          dispatch({
            type: SET_MESSAGE,
            payload: "Error getting your profile.",
          });
          return Promise.reject();
        }
      )

    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};

export const initiateReset = (email) => (dispatch) => {
  dispatch({
    type: LOADING,
  });

  dispatch({
    type: CLEAR_MESSAGE,
  })


  return AuthService.initiateReset(email).then(
    (res) => {
      dispatch({
        type: ITIATE_RESET_SUCCESS,
        payload: { email: email },
      });

      return Promise.resolve();
    }
  ).catch(
    (error) => {

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: ITIATE_RESET_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject()
    }
  )
}

export const checkCode = (email, code) => (dispatch) => {
  dispatch({
    type: LOADING,
  });

  dispatch({
    type: CLEAR_MESSAGE,
  })
  return AuthService.checkCode(email, code).then(
    (res) => {
      if (res.data) {
        dispatch({
          type: ITIATE_RESET_SUCCESS,
          payload: { email: email },
        });
        return Promise.resolve();
      } else {
        dispatch({
          type: ITIATE_RESET_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: "Invalid code or account status",
        });

        return Promise.reject()

      }
    }
  ).catch((error) => {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: ITIATE_RESET_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return Promise.reject()
  })
}

export const resetPassword = (data) => (dispatch) => {
  dispatch({
    type: LOADING,
  });

  dispatch({
    type: CLEAR_MESSAGE,
  })

  return AuthService.resetPassword(data).then(
    (res) => {
      dispatch({
        type: ITIATE_RESET_SUCCESS,
        payload: { user: res },
      });
      return Promise.resolve();
    }
  ).catch(
    (error) => {

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: ITIATE_RESET_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject()
    }
  )
}