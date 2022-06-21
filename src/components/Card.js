export default class Card {
  constructor(
    { name, link, likes, _id, owner },
    templateSelector,
    { handleCardClick, handleDeleteClick, likeCardBtnClick, clickDislike }
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this.id = _id;
    this.owner = owner;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._likeCardBtnClick = likeCardBtnClick;
    this._clickDislike = clickDislike;
  }

  _getTemplateElement() {
    this._cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".photos__card")
      .cloneNode(true);
    return this._cardTemplate;
  };

  deleteCard() {
    this._card.remove();
    this._card = null;
  };

  _likeCard() {
    if (this._isLiked) {
      this._clickDislike(this);
    } else {
      this._likeCardBtnClick(this);
    }
  };

  setCardLikes(card) {
    this._likes = card.likes;
    this._photosLikeCounter.textContent = this._likes.length;

    this._toggleLike();
  }

  _toggleLike = () => {
    this._photosLikeButton.classList.toggle("photos__like-button_liked");
    this._isLiked = !this._isLiked;
  };

  _returnLikes(userId) {
    if (
      this._likes.find((card) => {
        return card._id === userId;
      })
    ) {
      this._toggleLike();
    }
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
    this._photosLikeCounter.textContent = this._likes.length;

    this._setEventListeners();
    this._returnLikes(userId);

    return this._card;
  }

  _isHost() {
    return this.owner._id === this.userId;
  }

  _setEventListeners() {
    this._handleCardClick(this._photosImage, this._name, this._link);
    this._photosDeleteButton.addEventListener("click", () =>
      this._handleDeleteClick(this)
    );
    this._photosLikeButton.addEventListener("click", () => {
      this._likeCardBtnClick(this);
    });
  }
}
