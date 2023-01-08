import React, { useEffect, useState } from "react";
import { showInputError, showFormErrors } from "../../helpers/validateInput";
import Input from "../../components/Reusable/Input";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../assets/logos/logo.svg";
import { login } from "../../actions/auth/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../actions/auth/MessageAction";
import "../../styles/register.css";

const Login = () => {
  const { isLoading } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const loading = isLoading;
  const dispatch = useDispatch();
  const history = useHistory();
  const initialUser = {
    email: "",
    password: "",
  };

  const [loginData, setLoginData] = useState(initialUser);

  const inputHandler = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setLoginData({ ...loginData, [name]: value });
    showInputError(e.target);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showFormErrors()) {
      dispatch(login(loginData))
        .then(() => {
          history.push("/dashboard");
        })
        .catch((err) => {

        });
    }
  };
  useEffect(() => {
    dispatch(clearMessage());
  }, []);

  return (
    <div className="register-container min-h-screen flex items-center justify-center bg-gray-50 py-2 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-2 bg-white rounded-lg py-4">
        {/* logo */}
        <div className="logo-container">
          <img src="" alt="Logo" className="m-auto logo" />
        </div>
        <div className="text-center font-bold primary-color uppercase text-2xl header-reg px-10">
          login
        </div>
        {message && !loading ? (
          <div className="bg-red-500 rounded py-2 text-center font-bold text-black error-container">
            {message}
          </div>
        ) : null}
        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group-container w-full max-w-xs mx-auto">
            <div className="grid grid-cols-6 grid-rows-2  gap-8">
              <div className="col-span-6 gap-6 sm:col-span-6 sm:row-span-1 ">
                <Input
                  name="email"
                  inputHandler={inputHandler}
                  type="text"
                  labelName="Email or Phone Number"
                  placeholder="Email or Phone Number"
                  className="login-input"
                  required
                />
              </div>
              <div className="col-span-6 gap-6 sm:col-span-6 sm:row-span-1 ">
                <Input
                  name="password"
                  inputHandler={inputHandler}
                  type="password"
                  labelName="Password"
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <div className="text-right">
              <label className="block mt-2 text-sm font-bold">
                <Link to="/reset-password" className="primary-color">
                  Forgot Password?
                </Link>
              </label>
            </div>
          </div>
          <div className="mt-8 text-center">
            <button className="bg-primary hover:bg-gray-400 text-gray-800 font-bold  py-2 px-10 rounded inline-flex items-center">
              <span>Login</span>
            </button>
            <div>
              {loading && (
                <span className="loading primary-color">Loading ...</span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
