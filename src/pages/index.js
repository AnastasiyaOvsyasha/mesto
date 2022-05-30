import css from "../pages/index.css";

import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";

const validateSetting = {
  formSelector: ".edit-form",
  inputSelector: ".form__input",
  inputErrorSelector: ".form__input-error",
  inactiveSaveButtonClass: "form__save-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  submitButtonSelector: ".form__save-button",
};

const initialCardsData = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const profileNameSelector = ".profile__name";
const profileResearcherSelector = ".profile__researcher";
const photosListSelector = ".photos__list";

const popupEditSelector = ".popup-edit";
const popupEditFormName = document.querySelector(".edit-form[name=form]");
const profileEditButton = document.querySelector(".profile__edit-button");
const formInputTypeText = popupEditFormName.querySelector(
  ".form__input_type_text"
);
const formInputTypeAbout = popupEditFormName.querySelector(
  ".form__input_type_about"
);

const popupEditNameFormValidation = new FormValidator(
  validateSetting,
  popupEditFormName
);
popupEditNameFormValidation.enableValidation();

const popupAddSelector = ".popup-add";
const popupAddForm = document.querySelector(".add-form[name=new]");
const profileAddButton = document.querySelector(".profile__add-button");

const popupAddFormValidation = new FormValidator(validateSetting, popupAddForm);
popupAddFormValidation.enableValidation();

const cardTemplateSelector = "#template-photos";
const popupPhotosSelector = ".popup-photos";

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

const cardFromPopup = new PopupWithImage(popupPhotosSelector)

const handleCardClick = (cardPhotosList, cardName, cardLink) => {
  cardPhotosList.addEventListener("click", (e) => {
    cardFromPopup.open(cardName, cardLink);
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

const infoFormEventHandler = (formInputs) => {
  userInfo.setUserInfo({
    newUserName: formInputs.form__input_type_text,
    newUserAbout: formInputs.form__input_type_about,
  });
};

const addCard = (newCard) => {
  cardsList.addCardToTheBeginning(
    makeCard(
      {
        name: newCard[`form__input_type_title`],
        link: newCard[`form__input_type_link`],
      },
      cardTemplateSelector
    )
  );
};

profileEditButton.addEventListener("click", () => {
  initializeProfileInfo();
  popupEditNameFormValidation.clearFormInputError();

  const popup = new PopupWithForm(
    {
      submitForm: infoFormEventHandler,
    },
    popupEditSelector
  );

  popup.open();
});

profileAddButton.addEventListener("click", () => {
  const popup = new PopupWithForm(
    {
      submitForm: addCard,
    },
    popupAddSelector
  );

  popupAddFormValidation.clearFormInputError();
  popup.open();
});

cardsList.renderItems();
