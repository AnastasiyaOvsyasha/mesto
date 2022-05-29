export default class Card {
  constructor(name, link, templateSelector, { handleCardClick }) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._handleCardClick(this._photosImage, this._name, this._link);
    this._photosDeleteButton.addEventListener("click", () => this._delete());
    this._photosLikeButton.addEventListener("click", (e) => this._like(e));
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
