//Добавление фотографий

//Profile
const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileResearcher = profile.querySelector('.profile__researcher');

//Photos
const photos = document.querySelector('.photos');
const photosList = photos.querySelector('.photos__list');
const photosAddButton = profile.querySelector('.profile__add-button');
const templatePhotos = document.querySelector('#template-photos').content;

//Popup
const popup = document.querySelector('.popup');

   //popup-edit
   const popupEdit = document.querySelector('.popup-edit');
   const popupEditCloseIcon = popupEdit.querySelector('.popup-edit__close-icon');

   //popup-add
   const popupAdd = document.querySelector('.popup-add');
   const popupAddCloseIcon = popupAdd.querySelector('.popup-add__close-icon');

   //editForm
   const editForm = document.querySelector('.edit-form');
   const inputProfileName = editForm.querySelector('#profile-name');
   const inputProfileAbout = editForm.querySelector('#profile-about');

   //addForm
   const addForm = document.querySelector('.add-form');
   const inputPhotoName = addForm.querySelector('#photo-name');
   const inputPhotoLink = addForm.querySelector('#photo-link');

//Popup-photos
const popupPhotos = document.querySelector('.popup-photos');
const popupPhotosBigSizeImage = popupPhotos.querySelector('.popup-photos__bigsize-image');
const popupPhotosCaption = popupPhotos.querySelector('.popup-photos__caption');
const popupPhotosCloseIcon = popupPhotos.querySelector('.popup-photos__close-icon');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Функция добавления карточек
function addTemplatePhotos(name, URL, where = 'append') {
  const photosCard = templatePhotos.cloneNode(true);
  const photosImage = photosCard.querySelector('.photos__image');
  const photosLikeButton = photosCard.querySelector('.photos__like-button');
  const photosDeleteButton = photosCard.querySelector('.photos__delete-button');
  photosCard.querySelector('.photos__image').src = URL;
  photosCard.querySelector('.photos__image').alt = 'фотография ' + name;
  photosCard.querySelector('.photos__title').textContent = name;
  photosDeleteButton.addEventListener('click', deletePhotoButton);
  photosImage.addEventListener('click', openPhoto);
  photosLikeButton.addEventListener('click', likePhoto);
  if (where === 'append') {
    photosList.append(photosCard);
  } else if (where === 'prepend') {
    photosList.prepend(photosCard);
  }
}

function initializePhotos(arr) {
  arr.forEach(elem => {
    addTemplatePhotos(elem.name, elem.link, 'append');
  });
}
function initializeProfileInfo() {
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileResearcher.textContent;
}

function emptyInputValue(...inputs) {
  inputs.forEach(elem => elem.value = '');
}

function addPhotosCard(evt) {
  evt.preventDefault();
  addTemplatePhotos(inputPhotoName.value, inputPhotoLink.value, 'prepend');
  emptyInputValue(inputPhotoName, inputPhotoLink);
  closePopupAdd()
}

function openPopupEdit() {
  initializeProfileInfo();
  popupEdit.classList.add('popup_opened');
}

function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
}

function closePopupEdit() {
  popupEdit.classList.remove('popup_opened');
}

function closePopupAdd() {
  emptyInputValue(inputPhotoName, inputPhotoLink);
  popupAdd.classList.remove('popup_opened');
}

function profileSaveForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileResearcher.textContent = inputProfileAbout.value;
  closePopupEdit();
}

//Лайк фотографий
function likePhoto(evt) {
  evt.target.classList.toggle('photos__like-button_liked');
}

function deletePhotoButton(evt) {
  evt.target.closest('.photos__card').remove();
}
function closePhoto() {
  popupPhotos.classList.remove('popup_opened');
}

function openPhoto(evt) {
  const figure = evt.path[1];
  const img = figure.querySelector('.photos__image');
  const title = figure.querySelector('.photos__title');
  popupPhotosBigSizeImage.src= img.src;
  popupPhotosCaption.textContent = title.textContent;
  popupPhotos.classList.add('popup_opened');
}

//Обработчик событий
profileEditButton.addEventListener('click', openPopupEdit);
popupEditCloseIcon.addEventListener('click', closePopupEdit);
editForm.addEventListener('submit', profileSaveForm);

photosAddButton.addEventListener('click', openPopupAdd);
popupAddCloseIcon.addEventListener('click', closePopupAdd);
addForm.addEventListener('submit', addPhotosCard);
popupPhotosCloseIcon.addEventListener('click', closePhoto);

initializePhotos(initialCards);
