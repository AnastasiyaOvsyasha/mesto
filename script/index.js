/* Profile*/
let ProfileEditButton = document.querySelector('.profile__edit-button');
let ProfileName = document.querySelector('.profile__name');
let ProfileResearcher = document.querySelector('.profile__researcher');

/* Popup*/
let Popup = document.querySelector('.popup');
let PopupClossIcon = document.querySelector('.popup__close-icon');

/* Form*/
let FormSaveBtn = document.querySelector('.form__save-button');
let FormInputName = document.querySelector('.form__input-name');
let FormInputAbout = document.querySelector('.form__input-about');

function togglePopup() {
  Popup.classList.toggle('popup_opened');
  FormInputName.value = ProfileName.textContent;
  FormInputAbout.value = ProfileResearcher.textContent;
}

ProfileEditButton.addEventListener('click', togglePopup);
PopupClossIcon.addEventListener('click', togglePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  ProfileName.textContent = FormInputName.value;
  ProfileResearcher.textContent = FormInputAbout.value;
  togglePopup();
}

FormSaveBtn.addEventListener('click', formSubmitHandler);
