export const validateSelector = {
  formSelector: ".edit-form",
  inputSelector: ".form__input",
  inputErrorSelector: ".form__input-error",
  inactiveSaveButtonClass: "form__save-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  submitButtonSelector: ".form__save-button",
};

export const initialCardsData = [
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

export const profileNameSelector = ".profile__name";
export const profileResearcherSelector = ".profile__researcher";
export const photosListSelector = ".photos__list";

export const popupEditSelector = ".popup-edit";
export const popupEditFormName = document.querySelector(".edit-form[name=form]");
export const profileEditButton = document.querySelector(".profile__edit-button");
export const formInputTypeText = popupEditFormName.querySelector(
  ".form__input_type_text"
);
export const formInputTypeAbout = popupEditFormName.querySelector(
  ".form__input_type_about"
);

export const popupAddSelector = ".popup-add";
export const popupAddForm = document.querySelector(".add-form[name=new]");
export const profileAddButton = document.querySelector(".profile__add-button");

export const cardTemplateSelector = "#template-photos";
export const popupPhotosSelector = ".popup-photos";
