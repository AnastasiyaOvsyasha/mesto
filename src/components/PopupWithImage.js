import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhotosCaption = this._popup.querySelector(".popup-photos__caption");
    this._popupPhotosBigSizeImage = this._popup.querySelector(".popup-photos__bigsize-image")
  }

  open(name, link) {
    super.open();
    this._popupPhotosBigSizeImage.src = link;
    this._popupPhotosBigSizeImage.alt = name;
    this._popupPhotosCaption.textContent = name;
  }
}
