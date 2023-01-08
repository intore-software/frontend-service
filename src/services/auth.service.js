import axios from "axios";
const ENDPOINT = import.meta.env.VITE_REACT_APP_BASE_API_URL;

const login = (data) => {
  const url = `${ENDPOINT}/auth/login`;
  return axios.post(url, data).then((res) => {
    if (res.data.accessToken || res.data.data.accessToken) {
      sessionStorage.setItem(
        "token",
        JSON.stringify(
          res.data.accessToken
            ? res.data.accessToken
            : res.data.data.accessToken
        )
      );
    }
    return res.data;
  });
};

const logout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("hash");
  localStorage.removeItem("user");
};

const initiateReset = (email) => {
  return axios
    .post(`${ENDPOINT}/auth/initiate-password-reset`, {
      email: email,
    })
    .then((res) => {
      sessionStorage.setItem("email", email);
      return res.data;
    });
};

const checkCode = (email, code) => {
  return axios
    .post(`${ENDPOINT}/auth/check-code`, {
      activationCode: code,
      email: email,
    })
    .then((res) => {
      sessionStorage.setItem("code", code);
      return res.data;
    });
};

const resetPassword = (data) => {
  return axios.post(`${ENDPOINT}/auth/reset-password`, data).then((res) => {
    return res.data;
  });
};

export default {
  login,
  logout,
  initiateReset,
  resetPassword,
  checkCode,
};
