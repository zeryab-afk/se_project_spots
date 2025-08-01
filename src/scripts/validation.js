function showInputError(formEl, inputEl, message, config) {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(config.inputErrorClass);
  errorEl.textContent = message;
  errorEl.classList.add(config.errorClass);
}

function hideInputError(formEl, inputEl, config) {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(config.inputErrorClass);
  errorEl.textContent = "";
  errorEl.classList.remove(config.errorClass);
}

function checkInputValidity(formEl, inputEl, config) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
}

function toggleButtonState(inputs, button, config) {
  const isValid = inputs.every(input => input.validity.valid);
  button.classList.toggle(config.inactiveButtonClass, !isValid);
  button.disabled = !isValid;
}

function setEventListeners(formEl, config) {
  const inputs = Array.from(formEl.querySelectorAll(config.inputSelector));
  const button = formEl.querySelector(config.submitButtonSelector);

  inputs.forEach(inputEl => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputs, button, config);
    });
  });

  toggleButtonState(inputs, button, config);
}

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach(formEl => {
    setEventListeners(formEl, config);
  });
}

function clearValidation(formEl, config) {
  const inputs = Array.from(formEl.querySelectorAll(config.inputSelector));
  const button = formEl.querySelector(config.submitButtonSelector);

  inputs.forEach(inputEl => {
    hideInputError(formEl, inputEl, config);
  });

  button.classList.add(config.inactiveButtonClass);
  button.disabled = true;
}

export { enableValidation, clearValidation };