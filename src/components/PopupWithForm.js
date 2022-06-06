import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector }, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._formInputs = Array.from(this._popup.querySelectorAll(".form__input"));
    this._form = this._popup.querySelector(".form");
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    this._formValue = {};
    this._formInputs.forEach((input) => {
      this._formValue[input.name] = input.value;
    });
    return this._formValue;
  }

  _handleSubmitForm = (evt) => {
    evt.preventDefault();
    this._submitForm(this._getInputValues());
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmitForm);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener("submit", this._handleSubmitFormListener);
  }
}
