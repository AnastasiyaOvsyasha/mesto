import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ submitForm }, popupSelector) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._inputList = this._popup.querySelectorAll(".form__input");
    this._form = this._popup.querySelector(".form");
    this._popupSubmitButton = this._popup.querySelector(".form__save-button");
    this._handleSubmitFormListener = this._handleSubmitForm.bind(this);
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    this._formValue = {};
    this._inputList.forEach((input) => {
      this._formValue[input.name] = input.value;
    });
    return this._formValue;
  }

  _handleSubmitForm(event) {
    event.preventDefault();
    this._submitForm(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      this._handleSubmitFormListener(e);
    });
  }

  sendTextSubmitOnButton(text) {
    this._popupSubmitButton.textContent = text;
  }
}
