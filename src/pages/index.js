import css from "../pages/index.css";

import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";

import {
  validateSelector,
  initialCardsData,
  profileNameSelector,
  profileResearcherSelector,
  photosListSelector,
  popupEditFormName,
  profileEditButton,
  formInputTypeText,
  formInputTypeAbout,
  popupAddForm,
  profileAddButton,
  cardTemplateSelector,
  popupPhotosSelector,
} from "../utils/constants";

const popupEditNameFormValidation = new FormValidator(
  validateSelector,
  popupEditFormName
);
popupEditNameFormValidation.enableValidation();

const popupAddFormValidation = new FormValidator(
  validateSelector,
  popupAddForm
);
popupAddFormValidation.enableValidation();

function makeCard({ name, link }, templateSelector) {
  const newCard = new Card(name, link, templateSelector, {
    handleCardClick: handleCardClick,
  }).makeCard();
  return newCard;
}

const userInfo = new UserInfo({
  userNameSelector: profileNameSelector,
  userAboutSelector: profileResearcherSelector,
});

const cardFormPopup = new PopupWithImage(popupPhotosSelector)

const handleCardClick = (cardPhotosList, cardName, cardLink) => {
  cardPhotosList.addEventListener("click", (e) => {
    cardFormPopup.open(cardName, cardLink);
  });
};

const cardsList = new Section(
  {
    items: initialCardsData,
    renderer: (item) => {
      const cardElement = makeCard(item, cardTemplateSelector);
      cardsList.addItem(cardElement);
    },
  },
  photosListSelector
);

function initializeProfileInfo() {
  const { name, about } = userInfo.getUserInfo();
  formInputTypeText.value = name;
  formInputTypeAbout.value = about;
}

const newCardPopupEdit = new PopupWithForm({
  popupSelector: ".popup-edit",
  submitForm: (data) => {
    userInfo.setUserInfo({
      newUserName: formInputs.form__input_type_text,
      newUserAbout: formInputs.form__input_type_about,
    });
    cardsList.addItem(newCard(data));
  },
});

profileEditButton.addEventListener("click", () => {
  newCardPopupEdit.open();
  initializeProfileInfo();
  popupEditNameFormValidation.clearFormInputError();
});

const newCardPopupAdd = new PopupWithForm({
  popupSelector: ".popup-add",
  submitForm: () => {
    makeCard(
      {
        name: newCard[`photo-name`],
        link: newCard[`photo-link`],
      },
      cardTemplateSelector
    );
  },
});

profileAddButton.addEventListener("click", () => {
  popupAddFormValidation.clearFormInputError();
  newCardPopupAdd.open();
});

cardsList.renderItems();
