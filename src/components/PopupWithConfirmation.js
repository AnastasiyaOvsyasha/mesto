import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ receivedFunction }, popupSelector) {
    super(popupSelector);
    this._receivedFunction = receivedFunction;
    this._form = this._popup.querySelector(".form");
    this._handleSubmitFormListener = this._handleSubmitForm.bind(this)
  }

  _handleSubmitForm(event) {
    event.preventDefault();
    this._receivedFunction(this._card);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      this._handleSubmitFormListener(e);
    });
  }

  open(card) {
    super.open();
    this._card = card;
  }
}
