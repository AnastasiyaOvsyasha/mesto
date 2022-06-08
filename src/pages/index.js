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
  //popupEditSelector,
  //popupAddSelector
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

function addContentUserPopup(data) {
  formInputTypeText.value = data.name;
  formInputTypeAbout.value = data.about;
}

const newCardPopupEdit = new PopupWithForm({
  popupSelector: ".popup-edit",
  handleFormSubmit: (inputValue) => {
    userInfo.setUserInfo(inputValue);
    newCardPopupEdit.close();
},

handleFormReset: () => {
  popupEditNameFormValidation.clearFormInputError();
}
});

function editButtonClickHandler() {
  addContentUserPopup(userInfo.getUserInfo());
  newCardPopupEdit.open();
  popupEditNameFormValidation.changeButtonState();
}
profileEditButton.addEventListener('click', editButtonClickHandler);

const newCardPopupAdd = new PopupWithForm({
  popupSelector: ".popup-add",
  handleFormReset: () => {
    popupAddFormValidation.clearFormInputError();
  },
  handleFormSubmit: (inputValue) => {
    newCardPopupAdd.close();
    newCardPopupAdd.resetForm();
    const cardElement = makeCard(inputValue, cardFormPopup, cardTemplateSelector);
    cardsList.addItem(cardElement)
  }});


profileAddButton.addEventListener("click", addButtonClickHandler);


  function addButtonClickHandler() {
  popupAddFormValidation.clearFormInputError();
  popupAddFormValidation.changeButtonState();
  newCardPopupAdd.open();
};

newCardPopupAdd.setEventListeners();
newCardPopupEdit.setEventListeners();
cardFormPopup.setEventListeners();
cardsList.renderItems();
