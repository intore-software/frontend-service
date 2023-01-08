import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { checkCode, initiateReset } from '../../actions/auth/AuthActions';
import Countdown from "react-countdown";
import Logo from '../../assets/logos/logo.svg'
import '../../styles/register.css'

const EnterCode = ({
  dispatch,
  user
}) => {
  let numbers = [];
  let code = "";
  const resetUser = user ? user : sessionStorage.getItem('email');
  const history = useHistory();
  const [messageSent, setmessageSent] = useState(false)
  const [waitingMode, setwaitingMode] = useState(false)
  const [codeError, setcodeError] = useState(false)
  const { isLoading } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNumbersValue();
    numbers.forEach((el) => {
      code = code + el;
    })

    if (code.length === 6) {
      dispatch(checkCode(resetUser, code)).then(() => {
        history.push('/new-password')
      }).catch((err) => {
      })
    } else {
      setcodeError(true)
    }
  }

  const setNumbersValue = () => {
    var matches = document.querySelectorAll(".numbers");
    numbers = [];
    matches.forEach((el) => {
      numbers.push(el.value)
    });
  };

  const handleChange = (n) => {
    const currentInput = document.getElementById(`input-${n}`);
    if (currentInput.value.length === 1) {
      if (n < 6) {
        document.getElementById(`input-${n + 1}`).focus();
      }
    } else if (currentInput.value.length > 1) {
      let secondValue = currentInput.value.slice(1, 2);
      currentInput.value = currentInput.value.slice(0, 1);
      if (n < 6) {
        document.getElementById(`input-${n + 1}`).value = secondValue;
        document.getElementById(`input-${n + 1}`).focus();
      }
    } else {
      if (n > 1) {
        document.getElementById(`input-${n - 1}`).focus();
      }
    }
    if (n == 6) {
      setcodeError(false)
    }
  }


  const resendCode = () => {
    setwaitingMode(true);
    dispatch(initiateReset(resetUser)).then((res) => {
      setmessageSent(true)
    })
  }

  useEffect(() => {
    if (messageSent) {
      setTimeout(function () { setmessageSent(false) }, 5000);
      setTimeout(function () { setwaitingMode(false) }, 60000);
    }

    if (!sessionStorage.getItem("email")) {
      return history.push("/")
    }
  })
  return (
    <div className="register-container min-h-screen flex items-center justify-center bg-gray-50 py-2 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-2 bg-white rounded-lg py-12 pb-10">
        {/* logo */}
        <div className="logo-container">
          <img src="" alt="Logo" className="m-auto logo" />
        </div>
        <div className="text-center font-bold primary-color capitalize text-2xl header-reg px-10 py-5">
          Code
        </div>
        <h3 className="text-center text-gray-400 font-medium">Enter code sent on your email</h3>

        {messageSent && !isLoading && <div className="bg-blue-500 rounded py-2 text-center font-bold text-black error-container"><small>Code sent to {resetUser}</small></div>}

        {message && !isLoading && < div className="bg-red-500 rounded py-2 text-center font-bold text-black error-container"><small>{message}</small></div>}

        <form className="" onSubmit={handleSubmit}>
          <div className="w-full max-w-xs mx-auto mt-10">
            <label className="uppercase">Code</label>
            <div className={"code-input-container " + (codeError ? "error-code" : "")} id="input">
              <input type="number" className="numbers" id="input-1" onKeyUp={() => handleChange(1)} />
              <input type="number" className="numbers" id="input-2" onKeyUp={() => handleChange(2)} />
              <input type="number" className="numbers" id="input-3" onKeyUp={() => handleChange(3)} />
              <input type="number" className="numbers" id="input-4" onKeyUp={() => handleChange(4)} />
              <input type="number" className="numbers" id="input-5" onKeyUp={() => handleChange(5)} />
              <input type="number" className="numbers" id="input-6" onKeyUp={() => handleChange(6)} />
            </div>
            {codeError && <div className="text-right text-red-500">Code is not complete</div>}
            <div className="text-right">
              {waitingMode ? <Countdown date={Date.now() + 60000} renderer={renderer} /> :
                <label className="block mt-2 text-sm font-bold">
                  <a onClick={resendCode} className="primary-color">
                    Resend Code?
                  </a>
                </label>
              }
            </div>

          </div>
          <div className="button-container w-full max-w-xs mx-auto mt-10">
            <button className="button" target="_blank">{isLoading ? <>Loading...</> : <>Next</>}</button>
          </div>
        </form>
      </div>
    </div >
  )
}

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {

  } else {
    // Render a countdown
    return (
      <small className="font-bold">
        {hours}:{minutes}:{seconds} remains for claiming new code
      </small>
    );
  }
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading
});

export default connect(mapStateToProps)(EnterCode);