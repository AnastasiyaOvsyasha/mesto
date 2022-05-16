import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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

const profileName = document.querySelector(".profile__name");
const profileResearcher = document.querySelector(".profile__researcher");
const photosList = document.querySelector(".photos__list");

const popupEdit = document.querySelector(".popup-edit");
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

const popupAdd = document.querySelector(".popup-add");
const popupAddForm = document.querySelector(".add-form[name=new]");
const profileAddButton = document.querySelector(".profile__add-button");
const formInputTypeTitle = popupAddForm.querySelector(
  ".form__input_type_title"
);
const formInputTypeLink = popupAddForm.querySelector(".form__input_type_link");

const popupAddFormValidation = new FormValidator(validateSetting, popupAddForm);
popupAddFormValidation.enableValidation();

const popupCloseIcons = document.querySelectorAll(".popup__close-icon");

const cardTemplate = "#template-photos";

function makeCard(name, link, templateSelector) {
  return new Card(name, link, templateSelector).makeCard();
}

function createCard(initialCardsData) {
  initialCardsData.forEach((elem) => {
    photosList.append(makeCard(elem.name, elem.link, cardTemplate));
  });
}

function openPopup(popup) {
  document.addEventListener("keyup", closePopupOnEsc);
  popup.addEventListener("mouseup", closePopupOnOverlay);
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  document.removeEventListener("keyup", closePopupOnEsc);
  popup.removeEventListener("mouseup", closePopupOnOverlay);
  popup.classList.remove("popup_opened");
}

function initializeProfileInfo() {
  formInputTypeText.value = profileName.textContent;
  formInputTypeAbout.value = profileResearcher.textContent;
}

function infoFormEventHandler(event) {
  event.preventDefault();
  profileName.textContent = formInputTypeText.value;
  profileResearcher.textContent = formInputTypeAbout.value;
  closePopup(popupEdit);
}

function addCard(event) {
  event.preventDefault();
  photosList.prepend(
    makeCard(formInputTypeTitle.value, formInputTypeLink.value, cardTemplate)
  );
  closePopup(popupAdd);
}
function closePopupOnOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

function closePopupOnEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

profileEditButton.addEventListener("click", () => {
  initializeProfileInfo();
  popupEditNameFormValidation.clearFormInputError();
  openPopup(popupEdit);
});

profileAddButton.addEventListener("click", () => {
  popupAddForm.reset();
  popupAddFormValidation.clearFormInputError();
  openPopup(popupAdd);
});

popupCloseIcons.forEach((elem) =>
  elem.addEventListener("click", () => {
    closePopup(elem.closest(".popup"));
  })
);

popupEditFormName.addEventListener("submit", (event) => {
  infoFormEventHandler(event);
});

popupAddForm.addEventListener("submit", (event) => {
  addCard(event);
});

createCard(initialCardsData);
initializeProfileInfo();

export { openPopup };
