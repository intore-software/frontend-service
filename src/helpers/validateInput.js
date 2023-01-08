export const showInputError = (input) => {
  const name = input.name;
  if (!name) return true;
  const validity = input.validity;
  const label = document.getElementById(`${name}Label`).textContent;
  const error = document.getElementById(`${name}Error`);
  const isPasswordConfirm = name === 'passwordConfirm';

  if (!validity.valid) {
    if (validity.valueMissing) {
      error.textContent = `${label} is empty!`;
    } else if (validity.typeMismatch) {
      error.textContent = `${label} should be valid!`;
    } else if (isPasswordConfirm && validity.patternMismatch) {
      error.textContent = 'Passwords do not match';
    }
    return false;
  }

  error.textContent = '';
  return true;

}


export const showFormErrors = () => {
  const inputs = document.querySelectorAll('input');
  let isFormValid = true;

  inputs.forEach(input => {
    input.classList.add('active');

    const isInputValid = showInputError(input);

    if (!isInputValid) {
      isFormValid = false;
    }
  });

  return isFormValid;
}
