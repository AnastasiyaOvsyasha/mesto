const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const profileResearcher = profile.querySelector(".profile__researcher");

const photos = document.querySelector(".photos");
const photosList = photos.querySelector(".photos__list");
const photosAddButton = profile.querySelector(".profile__add-button");

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
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function initializePhotos(initialCards) {
  initialCards.forEach((elem) =>
    photosList.appendChild(createCard(elem.name, elem.link))
  );
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
  closePopupAdd(popupAddCloseIcon);
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
  closePopupEdit();
}

function deletePhotoButton(evt) {
  evt.target.closest(".photos__card").remove();
}
function closePhoto() {
  closePopup(popupPhotos);
}

//Обработчик событий
profileEditButton.addEventListener("click", openPopupEdit);
popupEditCloseIcon.addEventListener("click", closePopupEdit);
editForm.addEventListener("submit", saveProfileForm);

photosAddButton.addEventListener("click", openPopupAdd);
popupAddCloseIcon.addEventListener("click", closePopupAdd);
addForm.addEventListener("submit", addPhotosCard);
popupPhotosCloseIcon.addEventListener("click", closePhoto);

initializePhotos(initialCards);
