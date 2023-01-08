import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../actions/auth/AuthActions";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const logOut = () => {
    dispatch(logout());
    history.push("/login");
  };

  React.useEffect(() => {
    logOut();
  }, []);
  return <p className="p-10">Logging out...</p>;
};

export default LogoutPage;
