export const validateSelector = {
  formSelector: ".form",
  inputSelector: ".form__input",
  inputErrorSelector: ".form__input-error",
  inactiveSaveButtonClass: "form__save-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  submitButtonSelector: ".form__save-button",
};

export const profileNameSelector = ".profile__name";
export const profileResearcherSelector = ".profile__researcher";
export const photosListSelector = ".photos__list";

export const popupEditSelector = ".popup-edit";
export const popupEditForm = document.querySelector(".edit-form");
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const formInputTypeText = popupEditForm.querySelector(
  ".form__input_type_text"
);
export const formInputTypeAbout = popupEditForm.querySelector(
  ".form__input_type_about"
);

export const popupAddSelector = ".popup-add";
export const popupAddForm = document.querySelector(".add-form");
export const profileAddButton = document.querySelector(".profile__add-button");
export const profileAvatarSelector = ".profile__avatar";

export const cardTemplateSelector = "#template-photos";
export const popupPhotosSelector = ".popup-photos";

export const popupConfirmSelector = ".popup-confirm";
export const profileAvatarEditButton = document.querySelector(
  ".profile__avatar-edit-button"
);

export const updateAvatarPopupSelector = ".popup_update_user-avatar";

export const popupConfirmForm = document.querySelector(
  ".update-avatar-form"
);
