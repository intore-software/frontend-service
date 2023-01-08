import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { initiateReset } from '../../actions/auth/AuthActions'
import { clearMessage } from "../../actions/auth/MessageAction"
import Logo from '../../assets/logos/logo.svg'
import Input from '../../components/Reusable/Input'
import { showFormErrors, showInputError } from '../../helpers/validateInput'
import '../../styles/register.css'

const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoading } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);
  const loading = isLoading;
  const [error, seterror] = useState(false)

  const inputHandler = (e) => {
    setEmail(e.target.value);
    showInputError(e.target);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showFormErrors()) {
      dispatch(initiateReset(email)).then((res) => {
        history.push("/check-email");
      }).catch((error) => {
      })
    }
  }
  useEffect(() => {
    dispatch(clearMessage())
  }, []);

  // if (message !== "Please check your mail and activate account") {
  //   seterror(true)
  // }

  return (

    <div className="register-container min-h-screen flex items-center justify-center bg-gray-50 py-2 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-2 bg-white rounded-lg py-12 pb-1">
        {/* logo */}
        <div className="logo-container">
          <img src="" alt="Logo" className="m-auto logo" />
        </div>
        <div className="text-center font-bold primary-color capitalize text-2xl header-reg px-10 py-5">
          Reset Password
        </div>
        {message && !error && !loading ?
          <div className="bg-red-500 rounded py-2 text-center font-bold text-black error-container">
            {message}
          </div> : null}
        <form onSubmit={handleSubmit} noValidate className="pb-5">
          <div className="forgotpassword-container w-full max-w-xs mx-auto">
            <div className="my-6">
              <Input name="email" inputHandler={inputHandler} type="email" labelName="Email" placeholder="user@gmail.com" className="login-input" required />
            </div>

          </div>
          <div className="mb-10 text-center">
            <button className="bg-primary hover:bg-gray-400 text-gray-800 font-bold  py-2 px-10 rounded inline-flex items-center">
              <span>{loading ? <>Loading...</> : <>Send</>}</span>
            </button>
          </div>

          <div className="footer-content">
            <label className=" text-center pt-6 block mt-2 text-sm font-bold">
              Rember your password?
              <Link to="/login">
                <span className="primary-color"> Login</span>
              </Link>
            </label>
          </div>
        </form>
        {/* <div className="text-center">
          <label className="block mt-2 text-sm font-bold">Not registered? <Link to="/register" className="primary-color">Register</Link></label>
        </div> */}
      </div>
    </div>

  )
}
export default ForgotPassword;