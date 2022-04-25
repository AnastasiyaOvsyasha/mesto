const validateSetting = {
  formSelector: ".form",
  fieldsetSelector: ".form__fieldset",
  inputSelector: ".form__input",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  submitButtonSelector: ".form__save-button",
  inactiveSaveButtonClass: "form__save-button_inactive",
};

function getErrorElement(formElement, inputElement) {
  return formElement.querySelector(`#${inputElement.id}-error`);
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = getErrorElement(formElement, inputElement);
  inputElement.classList.add(validateSetting.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validateSetting.errorClass);
}

function hideInputError(formElement, inputElement) {
  const errorElement = getErrorElement(formElement, inputElement);
  inputElement.classList.remove(validateSetting.inputErrorClass);
  errorElement.textContent = " ";
  errorElement.classList.remove(validateSetting.errorClass);
}

function hasInvalidInput(formInputs) {
  return formInputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function toggleSubmitButtonState(formInputs, formSubmitButton) {
  if (hasInvalidInput(formInputs)) {
    formSubmitButton.disabled = true;
    formSubmitButton.classList.add(validateSetting.inactiveSaveButtonClass);
  } else {
    formSubmitButton.disabled = false;
    formSubmitButton.classList.remove(validateSetting.inactiveSaveButtonClass);
  }
}

function setEventListeners(formElement) {
  const formInputs = Array.from(
    formElement.querySelectorAll(validateSetting.inputSelector)
  );
  const formSubmitButton = formElement.querySelector(
    validateSetting.submitButtonSelector
  );

  toggleSubmitButtonState(formInputs, formSubmitButton);
  formInputs.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleSubmitButtonState(formInputs, formSubmitButton);
    });
  });
}

function enableValidation(settingsObject) {
  const formsList = Array.from(
    document.querySelectorAll(settingsObject.formSelector)
  );
  formsList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(
      formElement.querySelectorAll(settingsObject.fieldsetSelector)
    );
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });
  });
}

enableValidation(validateSetting);
