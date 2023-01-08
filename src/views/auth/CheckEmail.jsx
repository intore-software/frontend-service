import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../../assets/logos/logo.svg'
import "../../styles/register.css"
import { connect, useSelector } from 'react-redux'


const CheckEmail = ({
  dispatch,
  user
}) => {
  const dotInEmail = (email = "user123@gmail.com") => {
    let indexofAt = email.trim().indexOf('@');
    let leftPortion = email.slice(0, indexofAt);
    let rightPortion = email.slice(indexofAt, email.length)
    let leftPortionToArray = leftPortion.split('');
    let text = '';
    leftPortionToArray.map(
      (char, index) => {
        if (index === 0 || leftPortion.length - index <= 2) {
          text += char;
        } else {
          text += "*"
        }
      }
    )
    text += rightPortion;
    return <span className="email font-bold">{text}</span>
  }
  return (
    <>
      <div className="verify-container min-h-screen flex items-center justify-center bg-gray-50 py-2 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg w-full space-y-2 bg-white rounded-lg py-4 pb-3">
          {/* logo */}
          <div className="logo-container">
            <img src="" alt="Logo" className="m-auto logo" />
          </div>
          <div className="text-center font-bold primary-color capitalize text-2xl header-reg px-10">
            Check email
          </div>
          <div className="content-page text-center p-6">
            Check the code we sent to {dotInEmail(user ? user : sessionStorage.getItem('email'))}
          </div>
          <div className="footer-content text-center pt-6">
            <label className=" text-center pt-6 block mt-2 text-sm font-bold">
              <Link to="/code">
                <a href='/code' className="text-gray-400 hoverable">Go to Enter Code </a>
              </Link>
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(CheckEmail);
