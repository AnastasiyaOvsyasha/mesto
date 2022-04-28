const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const profileResearcher = profile.querySelector(".profile__researcher");

const photos = document.querySelector(".photos");
const photosList = photos.querySelector(".photos__list");
const photosImage = document.querySelector(".photos__image");
const photosAddButton = profile.querySelector(".profile__add-button");

const popupList = document.querySelectorAll(".popup");
const popupCloseIconList = document.querySelectorAll(".popup__close-icon");

const popupEdit = document.querySelector(".popup-edit");
const popupEditCloseIcon = popupEdit.querySelector(".popup-edit__close-icon");

const popupAdd = document.querySelector(".popup-add");
const popupAddCloseIcon = popupAdd.querySelector(".popup-add__close-icon");

const formEdit = document.querySelector(".edit-form");
const inputProfileName = formEdit.querySelector("#profile-name");
const inputProfileAbout = formEdit.querySelector("#profile-about");

const formAdd = document.querySelector(".add-form");
const formSaveButton = popupAdd.querySelector(".form__save-button");
const inputPhotoName = formAdd.querySelector("#photo-name");
const inputPhotoLink = formAdd.querySelector("#photo-link");

const popupPhotos = document.querySelector(".popup-photos");
const popupPhotosBigSizeImage = popupPhotos.querySelector(
  ".popup-photos__bigsize-image"
);
const popupPhotosCaption = popupPhotos.querySelector(".popup-photos__caption");
const popupPhotosCloseIcon = popupPhotos.querySelector(
  ".popup-photos__close-icon"
);

function createCard(name, url) {
  const templatePhotos = document.querySelector("#template-photos").content;
  const photosCard = templatePhotos
    .querySelector(".photos__card")
    .cloneNode(true);

  const photosImage = photosCard.querySelector(".photos__image");
  photosCard.querySelector(".photos__title").textContent = name;
  photosImage.src = url;
  photosImage.alt = name;

  photosCard
    .querySelector(".photos__delete-button")
    .addEventListener("click", () => photosCard.remove());
  photosCard
    .querySelector(".photos__like-button")
    .addEventListener("click", (e) =>
      e.target.classList.toggle("photos__like-button_liked")
    );

  photosCard.querySelector(".photos__image").addEventListener("click", (e) => {
    popupPhotosCaption.textContent = name;
    popupPhotosBigSizeImage.src = url;
    popupPhotosBigSizeImage.alt = name;
    openPopup(popupPhotos);
  });

  return photosCard;
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", eventHandler);
  document.addEventListener("keydown", escKeyHandler);
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("click", eventHandler);
  document.removeEventListener("keydown", escKeyHandler);
}

function initializePhotos(initialCards) {
  initialCards.forEach((elem) =>
    photosList.appendChild(createCard(elem.name, elem.link))
  );
}

function eventHandler(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function initializeProfileInfo() {
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileResearcher.textContent;
}

function resetInputValue(...inputs) {
  inputs.forEach((elem) => (elem.value = ""));
}

function addPhotosCard(evt) {
  evt.preventDefault();
  photosList.prepend(createCard(inputPhotoName.value, inputPhotoLink.value));
  formAdd.reset();
  closePopupAdd(popupAdd);
}

function openPopupEdit() {
  initializeProfileInfo();
  openPopup(popupEdit);
}

function openPopupAdd() {
  disableSubmitButton(formSaveButton, validateSetting.inactiveSaveButtonClass);
  openPopup(popupAdd);
}

function closePopupEdit() {
  closePopup(popupEdit);
}

function closePopupAdd() {
  resetInputValue(inputPhotoName, inputPhotoLink);
  closePopup(popupAdd);
}

function saveProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileResearcher.textContent = inputProfileAbout.value;
  closePopup(evt.target.closest(".popup-edit"));
}

function closePopupPhoto() {
  closePopup(popupPhotos);
}

function escKeyHandler(evt) {
  if (evt.key === "Escape") {
    popupList.forEach((popup) => {
      popup.classList.remove("popup_opened");
    });
  }
}

popupList.forEach((popup) => {
  popup.addEventListener("keydown", escKeyHandler);
});

//Обработчик событий
profileEditButton.addEventListener("click", openPopupEdit);
popupEditCloseIcon.addEventListener("click", closePopupEdit);
formEdit.addEventListener("submit", saveProfileForm);
popupCloseIconList.forEach((popupCloseIcon) => {
  popupCloseIcon.addEventListener("click", function (evt) {
    closePopup(evt.target.parentElement.parentElement);
  });
});

photosAddButton.addEventListener("click", openPopupAdd);
popupAddCloseIcon.addEventListener("click", closePopupAdd);
formAdd.addEventListener("submit", addPhotosCard);

initializePhotos(initialCards);
