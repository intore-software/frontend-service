import React, { useEffect, useState } from 'react'
import { showInputError, showFormErrors } from '../../helpers/validateInput'
import Input from '../../components/Reusable/Input'
import { useHistory } from 'react-router-dom'
import Logo from '../../assets/logos/logo.svg'
import '../../styles/register.css'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../../actions/auth/AuthActions'

const CreatePassword = () => {
  const [resetData, setRestData] = useState({});
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const history = useHistory();

  const inputHandler = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setRestData({ ...resetData, [name]: value });
    showInputError(e.target);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      "activationCode": sessionStorage.getItem('code'),
      "email": sessionStorage.getItem('email'),
      "password": resetData?.password
    };
    if (showFormErrors()) {
      dispatch(resetPassword(data)).then((res) => {
        sessionStorage.removeItem('code')
        sessionStorage.removeItem('email')
        history.push('/login');
      })
    }
  }

  useEffect(() => {
    if (!sessionStorage.getItem('code') || !sessionStorage.getItem('email')) {
      return history.push('/login')
    }
  })
  return (
    <div className="register-container min-h-screen flex items-center justify-center bg-gray-50 py-2 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg w-full space-y-2 bg-white rounded-lg py-4">
        {/* logo */}
        <div className="logo-container">
          <img src="" alt="Logo" className="m-auto logo" />
        </div>
        <div className="text-center font-bold primary-color capitalize text-2xl header-reg px-10">
          Create password
        </div>
        {message && !isLoading && < div className="bg-red-500 rounded py-2 text-center font-bold text-black error-container"><small>{message}</small></div>}

        <form onSubmit={handleSubmit} noValidate className="pt-6">
          <div className="input-group-container w-full max-w-xs mx-auto">
            <div className="grid grid-cols-6 grid-rows-2  gap-8">
              <div className="col-span-6 gap-6 sm:col-span-6 sm:row-span-1 ">
                <Input name="password" inputHandler={inputHandler} type="password" labelName="New Password" placeholder="New Password" className="login-input" required />
              </div>
              <div className="col-span-6 gap-6 sm:col-span-6 sm:row-span-1 ">
                <Input name="passwordConfirm" inputHandler={inputHandler} type="password" labelName="Confirm Password" placeholder="Password" pattern={resetData.password} required />
              </div>
            </div>

          </div>
          <div className="mt-14 text-center">
            <button className="bg-primary hover:bg-gray-400 text-gray-800 font-bold  py-2 px-10 rounded inline-flex items-center">
              <span>{isLoading ? <>Loading...</> : <>Update</>}</span>
            </button>
          </div>
        </form>


      </div>
    </div>
  )
}

export default CreatePassword
