export default class Card {
  constructor(
    { name, link, likes, _id, owner },
    templateSelector,
    { handleCardClick, handleDeleteClick, likeCardBtnClick }
  ) {
    this._name = name;
    this._link = link;
    this.likes = likes.length;
    this.id = _id;
    this.owner = owner;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._likeCardBtnClick = likeCardBtnClick;
  }

  _getTemplateElement() {
    this._cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".photos__card")
      .cloneNode(true);
    return this._cardTemplate;
  }

  _delete() {
    this._card.remove();
    this._card = null;
  }

  _setEventListeners() {
    if (this._photosDeleteButton) {
      this._photosDeleteButton.addEventListener("click", () =>
        this._handleDeleteClick(this)
      );
    }
    this._photosLikeButton.addEventListener("click", () => {
      this._likeCardBtnClick(this);
    });
    this._handleCardClick(this._photosImage, this._name, this._link);
  }

  makeCard() {
    this._card = this._getTemplateElement();

    this._photosImage = this._card.querySelector(".photos__image");
    this._photostTitle = this._card.querySelector(".photos__title");
    this._photosDeleteButton = this._card.querySelector(
      ".photos__delete-button"
    );
    this._photosLikeButton = this._card.querySelector(".photos__like-button");
    this._photosLikeCounter = this._card.querySelector(
      ".photos__like-counter"
    );
    this._photosImage.src = this._link;
    this._photosImage.alt = this._name;
    this._photostTitle.textContent = this._name;

    this.likesOnCard(this.likes)
    this._setEventListeners();

    return this._card;
  }

  likesOnCard(likes) {
    this.likes = likes
    this._photosLikeCounter.textContent = this.likes;
    if (this.isLiked()) {
      this._likeCardBtnClick.classList.add("photos__like-button_liked");
    } else {
      this._likeCardBtnClick.classList.remove("photos__like-button_liked");
    }
  }
}
