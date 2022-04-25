const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const profileResearcher = profile.querySelector(".profile__researcher");

const photos = document.querySelector(".photos");
const photosList = photos.querySelector(".photos__list");
const photosAddButton = profile.querySelector(".profile__add-button");

const popupLi = document.querySelectorAll(".popup");
const popupCloseIconLi = document.querySelectorAll(".popup__close-icon");

const popupEdit = document.querySelector(".popup-edit");
const popupEditCloseIcon = popupEdit.querySelector(".popup-edit__close-icon");

const popupAdd = document.querySelector(".popup-add");
const popupAddCloseIcon = popupAdd.querySelector(".popup-add__close-icon");

const editForm = document.querySelector(".edit-form");
const inputProfileName = editForm.querySelector("#profile-name");
const inputProfileAbout = editForm.querySelector("#profile-about");

const addForm = document.querySelector(".add-form");
const inputPhotoName = addForm.querySelector("#photo-name");
const inputPhotoLink = addForm.querySelector("#photo-link");

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

  photosCard.querySelector(".photos__image").src = url;
  photosCard.querySelector(".photos__image").alt = `фотография ${name}`;
  photosCard.querySelector(".photos__title").textContent = name;

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
  if (evt.target !== evt.target.parentElement.parentElement) {
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
  addForm.reset();
  closePopupAdd(popupAdd);
}

function openPopupEdit() {
  initializeProfileInfo();
  openPopup(popupEdit);
}

function openPopupAdd() {
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
  closePopup(evt.target.parentElement.parentElement);
}

function closePopupPhoto() {
  closePopup(popupPhotos);
}

function escKeyHandler(evt) {
  if (evt.key === "Escape") {
    if (popupAdd.classList.contains("popup_opened")) {
      closePopup(popupAdd);
    } else if (popupEdit.classList.contains("popup_opened")) {
      closePopup(popupEdit);
    } else if (popupPhotos.classList.contains("popup_opened")) {
      closePopup(popupPhotos);
    }
  }
}

popupLi.forEach((popup) => {
  popup.addEventListener("keydown", escKeyHandler);
});

//Обработчик событий
profileEditButton.addEventListener("click", openPopupEdit);
popupEditCloseIcon.addEventListener("click", closePopupEdit);
editForm.addEventListener("submit", saveProfileForm);
popupCloseIconLi.forEach((popupCloseIcon) => {
  popupCloseIcon.addEventListener("click", function (evt) {
    closePopup(evt.target.parentElement.parentElement);
  });
});

photosAddButton.addEventListener("click", openPopupAdd);
popupAddCloseIcon.addEventListener("click", closePopupAdd);
addForm.addEventListener("submit", addPhotosCard);

initializePhotos(initialCards);
