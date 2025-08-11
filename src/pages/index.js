// index.js - Updated with settings object and consistent disableButton usage

import './index.css';
import Api from '../utils/Api.js';
import { setButtonText } from '../utils/helpers.js';
import { enableValidation, disableButton } from '../scripts/validation.js';

// Image imports
import logo from '../images/logo.svg';
import avatar from '../images/avatar.jpg';
import pencil from '../images/pencil.svg';
import pencilLight from '../images/pencil-light.svg';
import plus from '../images/plus.svg';

// NEW: Settings object for validation
const settings = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__submit-btn',
  inactiveButtonClass: 'modal__submit-btn_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__error_visible'
};

// DOM Elements
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');
const profileAvatar = document.querySelector('.profile__avatar');
const avatarEditBtn = document.querySelector('.profile__avatar-btn');

const headerLogo = document.querySelector('.header__logo');
const editProfileButton = document.querySelector('.profile__edit-btn');
const newPostButton = document.querySelector('.profile__add-btn');

const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.getElementById('card-template').content;

const profileNameInput = document.getElementById('profile-name-input');
const profileDescriptionInput = document.getElementById('profile-description-input');
const cardImageInput = document.getElementById('card-image-input');
const cardCaptionInput = document.getElementById('card-caption-input');

const editProfileModal = document.getElementById('edit-profile-modal');
const newPostModal = document.getElementById('new-post-modal');
const imagePreviewModal = document.getElementById('image-preview-modal');
const editAvatarModal = document.getElementById('edit-avatar-modal');

const editAvatarForm = document.getElementById('edit-avatar-form');
const avatarInput = document.getElementById('profile-avatar-input');

const deleteModal = document.getElementById('delete-modal');
const deleteForm = document.getElementById('delete-form');

let selectedCard = null;
let selectedCardId = null;

const previewImage = imagePreviewModal.querySelector('.modal__preview-image');
const previewCaption = imagePreviewModal.querySelector('.modal__caption');

// Static assets
headerLogo.src = logo;
profileAvatar.src = avatar;
editProfileButton.querySelector('img').src = pencil;
avatarEditBtn.querySelector('img').src = pencilLight;
newPostButton.querySelector('img').src = plus;

// API instance
const api = new Api({
  baseUrl: 'https://around-api.en.tripleten-services.com/v1',
  headers: {
    authorization: '924ff39a-b0bd-4bba-9c49-5c305ade97a9',
    'Content-Type': 'application/json'
  }
});

// ------------------- Modal Functions -------------------
function openModal(modal) {
  modal.classList.add('modal_is-opened');
  document.addEventListener('keydown', closeOnEscape);
}

function closeModal(modal) {
  modal.classList.remove('modal_is-opened');
  document.removeEventListener('keydown', closeOnEscape);
}

function closeOnEscape(e) {
  if (e.key === 'Escape') {
    const opened = document.querySelector('.modal_is-opened');
    if (opened) closeModal(opened);
  }
}

document.querySelectorAll('.modal__close-btn').forEach(btn =>
  btn.addEventListener('click', () => closeModal(btn.closest('.modal')))
);

document.addEventListener('click', evt => {
  if (evt.target.classList.contains('modal_is-opened')) {
    closeModal(evt.target);
  }
});

// ------------------- Delete Card -------------------
deleteForm.querySelector('.modal__submit-btn_type_cancel')
  .addEventListener('click', () => {
    selectedCard = null;
    selectedCardId = null;
    closeModal(deleteModal);
  });

function handleDeleteSubmit(e) {
  e.preventDefault();
  const submitButton = e.submitter;
  setButtonText(submitButton, true, 'Deleting...', 'Yes');

  if (!selectedCardId || !selectedCard) return;

  api.removeCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      selectedCard = null;
      selectedCardId = null;
      closeModal(deleteModal);
    })
    .catch(err => console.error('Delete error:', err))
    .finally(() => {
      setButtonText(submitButton, false, 'Deleting...', 'Yes');
    });
}
deleteForm.addEventListener('submit', handleDeleteSubmit);

// ------------------- Create Card -------------------
function createCard(data) {
  const cardEl = cardTemplate.cloneNode(true);
  const card = cardEl.querySelector('.card');
  const img = card.querySelector('.card__image');
  const title = card.querySelector('.card__title');
  const likeBtn = card.querySelector('.card__like-btn');
  const deleteBtn = card.querySelector('.card__delete-btn');

  img.src = data.link;
  img.alt = data.name;
  title.textContent = data.name;

  if (data.isLiked) {
    likeBtn.classList.add('card__like-btn_active');
  }

  likeBtn.addEventListener('click', () => {
    const isLiked = likeBtn.classList.contains('card__like-btn_active');
    api.changeLikeStatus(data._id, !isLiked)
      .then(updatedCard => {
        if (updatedCard.isLiked) {
          likeBtn.classList.add('card__like-btn_active');
        } else {
          likeBtn.classList.remove('card__like-btn_active');
        }
      })
      .catch(err => console.error('Like/unlike error:', err));
  });

  deleteBtn.addEventListener('click', () => {
    selectedCard = card;
    selectedCardId = data._id;
    openModal(deleteModal);
  });

  img.addEventListener('click', () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(imagePreviewModal);
  });

  return cardEl;
}

function setUserInfo(user) {
  profileName.textContent = user.name;
  profileTitle.textContent = user.about;
  profileAvatar.src = user.avatar;
}

// ------------------- Handlers -------------------
function handleEditProfileSubmit(data, submitButton) {
  setButtonText(submitButton, true, 'Saving...', 'Save');
  api.editUserInfo(data)
    .then(updatedUser => {
      setUserInfo(updatedUser);
      disableButton(submitButton, settings); // UPDATED: Using disableButton
      closeModal(editProfileModal);
    })
    .catch(err => console.error('Edit profile error:', err))
    .finally(() => {
      setButtonText(submitButton, false, 'Saving...', 'Save');
    });
}

function handleEditAvatarSubmit(avatarUrl, submitButton) {
  setButtonText(submitButton, true, 'Saving...', 'Save');
  api.updateUserAvatar(avatarUrl)
    .then(updatedUser => {
      setUserInfo(updatedUser);
      disableButton(submitButton, settings); // UPDATED: Using disableButton
      closeModal(editAvatarModal);
    })
    .catch(err => console.error('Edit avatar error:', err))
    .finally(() => {
      setButtonText(submitButton, false, 'Saving...', 'Save');
    });
}

// ------------------- Initial Load -------------------
api.getAppInfo()
  .then(([cards, user]) => {
    setUserInfo(user);
    cards.forEach(card => cardsList.append(createCard(card)));
  })
  .catch(err => console.error('App init error:', err));

// ------------------- Form Listeners -------------------
document.getElementById('edit-profile-form').addEventListener('submit', e => {
  e.preventDefault();
  const submitButton = e.submitter;
  const updated = {
    name: profileNameInput.value,
    about: profileDescriptionInput.value
  };
  handleEditProfileSubmit(updated, submitButton);
});

document.getElementById('new-post-form').addEventListener('submit', e => {
  e.preventDefault();
  const submitButton = e.submitter;
  const newCard = {
    name: cardCaptionInput.value,
    link: cardImageInput.value
  };

  setButtonText(submitButton, true, 'Saving...', 'Create');
  api.addCard(newCard)
    .then(card => {
      cardsList.prepend(createCard(card));
      disableButton(submitButton, settings); // UPDATED: Using disableButton
      closeModal(newPostModal);
      e.target.reset();
    })
    .catch(err => console.error('Add card error:', err))
    .finally(() => {
      setButtonText(submitButton, false, 'Saving...', 'Create');
    });
});

editAvatarForm.addEventListener('submit', e => {
  e.preventDefault();
  const submitButton = e.submitter;
  const newAvatarUrl = avatarInput.value;
  handleEditAvatarSubmit(newAvatarUrl, submitButton);
});

// ------------------- Modal Openers -------------------
editProfileButton.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileTitle.textContent;
  openModal(editProfileModal);
});

newPostButton.addEventListener('click', () => openModal(newPostModal));

avatarEditBtn.addEventListener('click', () => {
  avatarInput.value = '';
  openModal(editAvatarModal);
});

// Enable validation with settings
enableValidation(settings);