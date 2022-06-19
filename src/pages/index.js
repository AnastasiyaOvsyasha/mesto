import css from "../pages/index.css";

import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import Api from "../components/Api";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

import {
  validateSelector,
  profileNameSelector,
  profileResearcherSelector,
  photosListSelector,
  profileEditButton,
  formInputTypeText,
  formInputTypeAbout,
  popupAddForm,
  popupEditForm,
  profileAddButton,
  cardTemplateSelector,
  popupPhotosSelector,
  popupEditSelector,
  popupAddSelector,
  profileAvatarSelector,
  popupConfirmSelector,
  popupConfirmForm,
  profileAvatarEditButton,
  updateAvatarPopupSelector,
} from "../utils/constants";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-43",
  headers: {
    authorization: "4a54ce76-e7c6-4200-bbf8-f4a56f498098", //вставить токен
    "Content-Type": "application/json",
  },
});

Promise.all([api.getDataUser(), api.getInitialCardsData()])
  .then(([userRequestInfo, userRequestCards]) => {
    userInfo.setUserInfo(userRequestInfo);
    cardsList.renderItems(userRequestCards);
  })
  .catch(() => {
    (error) => console.log(error);
  });

const popupEditFormValidation = new FormValidator(
  validateSelector,
  popupEditForm
);
popupEditFormValidation.enableValidation();

const popupAddFormValidation = new FormValidator(
  validateSelector,
  popupAddForm
);
popupAddFormValidation.enableValidation();

const popupConfirmFormValidation = new FormValidator(
  validateSelector,
  popupConfirmForm
);
popupConfirmFormValidation.enableValidation();

const popupConfirmation = new PopupWithConfirmation(
  {
    receivedFunction: deleteCard,
  },
  popupConfirmSelector
);

const makeCard = (card, templateSelector) => {
  const newCard = new Card(
    {
      ...card,
    },
    templateSelector,
    {
      handleCardClick: handleCardClick,
      handleDeleteClick: handleDeleteClick,
      likeCardBtnClick: likeCardBtnClick,
      clickDislike: clickDislikeCard,
    }
  ).makeCard(userInfo.userId);
  return newCard;
};

const userInfo = new UserInfo({
  userNameSelector: profileNameSelector,
  userAboutSelector: profileResearcherSelector,
  avatarSelector: profileAvatarSelector,
});

const cardFromPopup = new PopupWithImage(popupPhotosSelector);

const handleCardClick = (cardPhotosList, cardName, cardLink) => {
  cardPhotosList.addEventListener("click", () => {
    cardFromPopup.open(cardName, cardLink);
  });
};

function likeCardBtnClick(card) {
  api
    .likeCard(card.id)
    .then((newCard) => {
      card.setCardLikes(newCard);
    })
    .catch((err) => {
      console.log(err);
    });
}

function clickDislikeCard(card) {
  api
    .dislikeCard(card.id)
    .then((newCard) => {
      card.setCardLikes(newCard);
    })
    .catch((err) => {
      console.log(err);
    });
}

const handleDeleteClick = (card) => {
  popupConfirmation.open(card);
};

const cardsList = new Section(
  {
    renderer: (item) => {
      const cardElement = makeCard(item, cardTemplateSelector);
      cardsList.addItem(cardElement);
    },
  },
  photosListSelector
);

function deleteCard(card) {
  api
    .deleteCard(card.id)
    .then(() => card.deleteCard())
    .then(() => popupConfirmation.close())
    .catch((err) => console.log(err));
}

const initializeProfileInfo = () => {
  const { name, about } = userInfo.getUserInfo();
  formInputTypeText.value = name;
  formInputTypeAbout.value = about;
};

const infoFormEventHandler = (formInputs) => {
  popupEdit.sendTextSubmitOnButton("Сохранение...");
  api
    .setDataUser({
      newUserName: formInputs.form__input_type_text,
      newUserAbout: formInputs.form__input_type_about,
    })
    .then((data) => {
      userInfo.setUserInfo({
        ...data,
      });
    })
    .then(() => popupEdit.close())
    .finally(() => popupEdit.sendTextSubmitOnButton("Сохранить"))
    .catch((err) => console.log(err));
};

const addNewCard = (newCard) => {
  popupAdd.sendTextSubmitOnButton("Сохранение...");
  api
    .addCard({
      cardName: newCard[`form__input_type_title`],
      cardLink: newCard[`form__input_type_link`],
    })
    .then((newCard) => {
      console.log(newCard);
      cardsList.addCardToTheBeginning(
        makeCard(
          {
            ...newCard,
          },
          cardTemplateSelector
        )
      );
    })
    .then(() => popupAdd.close())
    .finally(() => popupAdd.sendTextSubmitOnButton("Создать"))
    .catch((err) => console.log(err));
};

const updateAvatar = (formInput) => {
  popupAvatar.sendTextSubmitOnButton("Сохранение...");
  api
    .updateUserAvatar(formInput["form__input_update_avatar"])
    .then(() => {
      userInfo.setUserInfo({
        avatar: formInput["form__input_update_avatar"],
      });
      popupAvatar.close();
    })
    .finally(() => popupAvatar.sendTextSubmitOnButton("Создать"))
    .catch((err) => console.log(err));
};

profileEditButton.addEventListener("click", () => {
  initializeProfileInfo();
  popupEditFormValidation.clearFormInputError();
  popupEdit.open();
});

const popupEdit = new PopupWithForm(
  {
    submitForm: infoFormEventHandler,
  },
  popupEditSelector
);

const popupAdd = new PopupWithForm(
  {
    submitForm: addNewCard,
  },
  popupAddSelector
);

profileAddButton.addEventListener("click", () => {
  popupAddFormValidation.clearFormInputError();
  popupAdd.open();
});

const popupAvatar = new PopupWithForm(
  {
    submitForm: updateAvatar,
  },
  updateAvatarPopupSelector
);

profileAvatarEditButton.addEventListener("click", () => {
  popupConfirmFormValidation.clearFormInputError();
  popupAvatar.open();
});

popupConfirmation.setEventListeners();
popupAvatar.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
cardFromPopup.setEventListeners();
