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
const photosElement = document.querySelector('#template-photos').content;

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

