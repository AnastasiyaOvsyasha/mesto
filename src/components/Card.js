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

  _getTemplateElement = () => {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".photos__card")
      .cloneNode(true);
    return cardTemplate;
  }

  _delete = () => {
    this._card.remove();
    this._card = null;
  }

  setCardLikes(likes) {
    this.likes = likes;
    this.isLiked()
      ? this._photosLikeButton.classList.add("photos__like-button_liked")
      : this._photosLikeButton.classList.remove("photos__like-button_liked");
    this._photosLikeCounter.textContent = this.likes;
  }

  makeCard(userId) {
    this.userId = userId;
    this._card = this._getTemplateElement();

    this._photosImage = this._card.querySelector(".photos__image");
    this._photostTitle = this._card.querySelector(".photos__title");
    this._photosDeleteButton = this._card.querySelector(
      ".photos__delete-button"
    );
    this._photosLikeButton = this._card.querySelector(".photos__like-button");
    this._photosLikeCounter = this._card.querySelector(".photos__like-counter");

    if (!this._isHost(userId)) {
      this._photosDeleteButton.remove();
    }

    this._photosImage.src = this._link;
    this._photosImage.alt = this._name;
    this._photostTitle.textContent = this._name;

    this._setEventListeners();
    //this.setCardLikes(this.likes);

    return this._card;
  }

  _isHost() {
    return this.owner._id === this.userId;
  }

  isLiked() {
    return this.likes.some((like) => like._id === this._userId);
  }

  _setEventListeners() {
    this._photosImage.addEventListener("click", () =>
      this._handleCardClick(this._photosImage, this._name, this._link)
    );
    this._photosDeleteButton.addEventListener("click", () =>
      this._handleDeleteClick(this)
    );
    this._photosLikeButton.addEventListener("click", () => {
      this._likeCardBtnClick(this);
    });
  }
}
