import { openPopup } from "./index.js";

const popupPhotos = document.querySelector(".popup-photos");
const popupPhotosBigSizeImage = document.querySelector(
  ".popup-photos__bigsize-image"
);
const popupPhotosCaption = document.querySelector(".popup-photos__caption");

class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplateElement() {
    this._cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".photos__card")
      .cloneNode(true);
    return this._cardTemplate;
  }

  _like() {
    this._photosLikeButton.classList.toggle("photos__like-button_liked");
  }

  _delete() {
    this._cards.remove();
    this._cards = null;
  }

  _setEventListeners() {
    this._photosDeleteButton.addEventListener("click", () => this._delete());
    this._photosLikeButton.addEventListener("click", (e) => this._like(e));
    this._photosImage.addEventListener("click", (e) => this._openCardPopup(e));
  }

  _openCardPopup() {
    popupPhotosBigSizeImage.src = this._link;
    popupPhotosBigSizeImage.alt = this._name;
    popupPhotosCaption.textContent = this._name;
    openPopup(popupPhotos);
  }

  makeCard() {
    this._cards = this._getTemplateElement();

    this._photosImage = this._cards.querySelector(".photos__image");
    this._photostTitle = this._cards.querySelector(".photos__title");
    this._photosDeleteButton = this._cards.querySelector(
      ".photos__delete-button"
    );
    this._photosLikeButton = this._cards.querySelector(".photos__like-button");

    this._photosImage.src = this._link;
    this._photosImage.alt = this._name;
    this._photostTitle.textContent = this._name;

    this._setEventListeners();

    return this._cards;
  }
}

export { Card };
