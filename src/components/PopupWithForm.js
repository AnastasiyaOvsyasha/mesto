import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, handleFormReset }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleFormReset = handleFormReset;
    this._form = this._popup.querySelector(".form");
    this._formInputs = this._popup.querySelectorAll(".form__input");
  }

  _getInputValues() {
    this._formValue = {};
    this._formInputs.forEach((input) => {
      this._formValue[input.name] = input.value;
    });
    return this._formValue;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmitFormBtn.bind(this));
  }

  close() {
    super.close();
    this._handleFormReset();
  }

  resetForm() {
    this._form.reset();
  }

  _handleSubmitFormBtn() {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

}
