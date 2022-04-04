/* Profile*/
let profileEditButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileResearcher = document.querySelector('.profile__researcher');

/* Popup*/
let popup = document.querySelector('.popup');
let popupCloseIcon = document.querySelector('.popup__close-icon');

/* Form*/
let form = document.querySelector('.form');
let formTypeText = document.querySelector('.form_type-text');
let formTypeAbout = document.querySelector('.form_type-about');

function togglePopup() {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    formTypeText.value = profileName.textContent;
    formTypeAbout.value = profileResearcher.textContent;
  }
}

profileEditButton.addEventListener('click', togglePopup);
popupCloseIcon.addEventListener('click', togglePopup);
function formSubmitHandler(evt) {
  // Инструкция ниже отменяет отправку данных
  evt.preventDefault();
  profileName.textContent = formTypeText.value;
  profileResearcher.textContent = formTypeAbout.value;
  togglePopup();
}

form.addEventListener('submit', formSubmitHandler);
