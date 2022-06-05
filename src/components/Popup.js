export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeOnClickEsc = this._closeOnClickEsc.bind(this);
    this._closeOnClickOverlay = this._closeOnClickOverlay.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._closeOnClickEsc);
    document.addEventListener('click', this._closeOnClickOverlay);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._closeOnClickEsc);
    document.removeEventListener('click', this._closeOnClickOverlay);
  }

  _closeOnClickOverlay(evt) {
    if (evt.target.classList.contains("popup") || evt.target.classList.contains('popup__close-icon')) {
      this.close();
    }
  }

  _closeOnClickEsc(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener('click', () => this._closeOnClickOverlay());
  }
}
