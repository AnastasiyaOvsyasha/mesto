import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ submitForm }, popupSelector) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._formInputs = this._popup.querySelectorAll(".form__input");
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

  _handleSubmitForm(event) {
    event.preventDefault();
    this._submitForm(this._getInputValues());
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._handleSubmitFormListener = this._handleSubmitForm.bind(this);
    this._form.addEventListener("submit", this._handleSubmitFormListener);
  }
}
