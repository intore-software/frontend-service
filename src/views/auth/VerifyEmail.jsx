import React, { useState } from "react";
import Logo from "../../assets/logos/logo.svg";
import "../../styles/register.css";
import { Link } from "react-router-dom";
import useQuery from "../../helpers/useQuery";
import axios from "axios";
import authHeader from "../../services/auth-header";

const VerifyEmail = () => {
  const [status, setstatus] = useState({
    error: false,
    success: true,
    loading: true,
  });

  const query = useQuery();

  React.useEffect(() => {
    async function verifyEmail() {
      setstatus({ error: false, success: false, loading: true });
      let email = query.get("email");
      let code = query.get("code");
      try {
        let response = await axios.put(
          `${import.meta.env.VITE_REACT_APP_BASE_API_URL}/auth/verify-email`,
          { email, activationCode: code },
          { headers: authHeader() }
        );
        if (response.data.success)
          setstatus({ error: false, loading: false, success: true });
      } catch (error) {
        setstatus({ error: true, message: error?.response?.data?.message, loading: false, success: false });
      }
    }
    verifyEmail();
  }, []);

  return (
    <div className="register-container min-h-screen flex items-center justify-center bg-gray-50 py-2 px-4 sm:px-6 lg:px-8">
      <div
        className="w-full max-w-lg space-y-2 bg-white rounded-lg py-12 pb-1"
        style={{ minHeight: "25rem" }}
      >
        {/* logo */}
        <div className="logo-container">
          <img src="" alt="Logo" className="m-auto logo" />
        </div>
        {status.loading ? (
          <div className="py-8 text-center text-black font-bold">
            Verifying your email...
          </div>
        ) : status.error ? (

          <div className="bg-red-500 rounded py-2 text-center font-bold text-black error-container">
            {status.error ? <p>{status.message}</p> : <>  <p>Email verification failed.</p>
              <p>
                Please make sure that you have copied and pasted the entire URL
                from your email in your browser.
              </p>
            </>}
          </div>
        ) : status.success ? (
          <div className="footer-content">
            <label className=" text-center pt-6 block mt-2 text-sm font-bold">
              Your Email Address has been verified
              <Link to="/login">
                <span className="primary-color"> Continue to Login Panel</span>
              </Link>
            </label>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default VerifyEmail;
