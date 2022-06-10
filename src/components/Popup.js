export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._popupCloseIcons = this._popup.querySelector(".popup__close-icon");
    }

    open() {
      this.setEventListeners();
      this._popup.classList.add("popup_opened");
    }

    close() {
      this._popup.classList.remove("popup_opened");
      this._removeEventListeners();
    }

    _closeOnClickOverlay(evt) {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    }

    _closeOnClickEsc(evt) {
      if (evt.key === "Escape") {
        this.close();
      }
    }

    setEventListeners() {
      this._closeOnClickEsc = this._closeOnClickEsc.bind(this);

      this._popupCloseIcons.addEventListener("click", this.close.bind(this));
      this._popup.addEventListener("click", (evt) =>
        this._closeOnClickOverlay(evt)
      );
      document.addEventListener("keydown", this._closeOnClickEsc);
    }

    _removeEventListeners() {
      this._popupCloseIcons.removeEventListener("click", this.close.bind(this));
      this._popup.removeEventListener("mouseup", (evt) =>
        this._closeOnClickOverlay(evt)
      );
      document.removeEventListener("keyup", this._closeOnClickEsc);
    }
  }
