export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseIcons = this._popup.querySelector(".popup__close-icon");
  }
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._closeOnClickEsc);
  }
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._closeOnClickEsc);
  }
  _closeOnClickOverlay(evt) {
    if (evt.target.classList.contains("popup") || evt.target.classList.contains('popup__close-icon')) {
      this.close();
    }
  }
  _closeOnClickEsc = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (evt) =>
    this._closeOnClickOverlay(evt));
    this._popupCloseIcons.addEventListener("click", () => this.close());
  }
}
