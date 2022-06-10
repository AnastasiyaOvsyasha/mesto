export default class FormValidator {
  constructor(validateSelector, form) {
    this._form = form;
    this._submitButtonSelector = validateSelector.submitButtonSelector;
    this._inputSelector = validateSelector.inputSelector;
    this._inputErrorSelector = validateSelector.inputErrorSelector;
    this._inactiveSaveButtonClass = validateSelector.inactiveSaveButtonClass;
    this._inputErrorClass = validateSelector.inputErrorClass;
    this._errorClass = validateSelector.errorClass;
    this._formInputs = this._form.querySelectorAll(this._inputSelector);
  }

  _showInputError(input) {
    const error = this._form.querySelector(
      `[data-input=${input.dataset.input}-error]`
    );
    error.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
    error.classList.add(this._errorClass);
  }

  enableValidation() {
    this._setEventListeners();
    this._toggleSubmitButtonState();
  }

  _setEventListeners() {
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._form.addEventListener("input", (event) => {
      this._hasFormInput(event.target);
      this._toggleSubmitButtonState();
    });
  }

  _hasFormInput(input) {
    !input.validity.valid
      ? this._showInputError(input)
      : this._hideInputError(input);
  }

  _hideInputError(input) {
    const error = this._form.querySelector(
      `[data-input=${input.dataset.input}-error]`
    );
    error.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
  }

  _toggleSubmitButtonState() {
    this._submitButton.disabled = !this._form.checkValidity();
    this._submitButton.classList.toggle(
      this._inactiveSaveButtonClass,
      !this._form.checkValidity()
    );
  }

  clearFormInputError() {
    this._formInputs.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleSubmitButtonState();
  }
}
