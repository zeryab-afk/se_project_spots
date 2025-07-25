// validation.js
function showInputError(formEl, inputEl, errorMessage, config) {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(config.inputErrorClass);
  errorEl.textContent = errorMessage;
  errorEl.classList.add(config.errorClass);
}

function hideInputError(formEl, inputEl, config) {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(config.inputErrorClass);
  errorEl.textContent = '';
  errorEl.classList.remove(config.errorClass);
}

function checkInputValidity(formEl, inputEl, config) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
}

function toggleButtonState(inputEls, buttonEl, config) {
  const isValid = inputEls.every(inputEl => inputEl.validity.valid);
  if (isValid) {
    buttonEl.classList.remove(config.inactiveButtonClass);
    buttonEl.disabled = false;
  } else {
    buttonEl.classList.add(config.inactiveButtonClass);
    buttonEl.disabled = true;
  }
}

function setEventListeners(formEl, config) {
  const inputEls = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);

  inputEls.forEach(inputEl => {
    inputEl.addEventListener('input', () => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputEls, buttonEl, config);
    });
  });

  toggleButtonState(inputEls, buttonEl, config);
}

function enableValidation(config) {
  const formEls = Array.from(document.querySelectorAll(config.formSelector));
  formEls.forEach(formEl => {
    formEl.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formEl, config);
  });
}

function clearValidation(formEl, config) {
  const inputEls = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);

  inputEls.forEach(inputEl => {
    hideInputError(formEl, inputEl, config);
  });

  buttonEl.classList.add(config.inactiveButtonClass);
  buttonEl.disabled = true;
}

export { enableValidation, clearValidation };