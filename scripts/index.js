// index.js
import { enableValidation, clearValidation } from './validation.js';

// Initial Cards Data
const initialCards = [
  {
    name: "Val Thorens",
    link: "./images/1-photo-by-moritz-feldmann-from-pexels.jpg"
  },
  {
    name: "Restaurant Terrace",
    link: "./images/2-photo-by-ceiline-from-pexels.jpg"
  },
  {
    name: "An outdoor cafe",
    link: "./images/3-photo-by-tubanur-dogan-from-pexels.jpg"
  },
  {
    name: "A very long bridge over the Forest",
    link: "./images/4-photo-by-maurice-laschet-from-pexels.jpg"
  },
  {
    name: "Tunnel with morning light",
    link: "./images/5-photo-by-van-anh-nguyen-from-pexels.jpg"
  },
  {
    name: "Mountain house",
    link: "./images/6-photo-by-moritz-feldmann-from-pexels.jpg"
  },
];

// DOM Elements
const editProfileButton = document.querySelector('.profile__edit-btn');
const newPostButton = document.querySelector('.profile__add-btn');
const editProfileModal = document.getElementById('edit-profile-modal');
const newPostModal = document.getElementById('new-post-modal');
const imagePreviewModal = document.getElementById('image-preview-modal');
const editProfileCloseButton = editProfileModal.querySelector('.modal__close-btn');
const newPostCloseButton = newPostModal.querySelector('.modal__close-btn');
const previewCloseButton = imagePreviewModal.querySelector('.modal__close-btn');
const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.getElementById('card-template').content;
const previewImage = imagePreviewModal.querySelector('.modal__preview-image');
const previewCaption = imagePreviewModal.querySelector('.modal__caption');
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');
const profileNameInput = document.getElementById('profile-name-input');
const profileDescriptionInput = document.getElementById('profile-description-input');
const cardCaptionInput = document.getElementById('card-caption-input');
const cardImageInput = document.getElementById('card-image-input');
const editProfileForm = document.getElementById('edit-profile-form');
const newPostForm = document.getElementById('new-post-form');

const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled", // Updated this line
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};
// Initialize validation
enableValidation(validationConfig);

// Modal Functions
function openModal(modal) {
  modal.classList.add('modal_is-opened');
  document.addEventListener('keydown', handleEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove('modal_is-opened');
  document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(evt) {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.modal_is-opened');
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

// Create Card Function
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const card = cardElement.querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-btn');
  const deleteButton = cardElement.querySelector('.card__delete-btn');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  likeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    likeButton.classList.toggle('card__like-btn_active');
  });

  deleteButton.addEventListener('click', (e) => {
    e.stopPropagation();
    card.remove();
  });

  cardImage.addEventListener('click', () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(imagePreviewModal);
  });

  return cardElement;
}

function renderInitialCards() {
  initialCards.forEach(cardData => {
    cardsList.appendChild(getCardElement(cardData));
  });
}

// Form Handlers
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileTitle.textContent = profileDescriptionInput.value;
  closeModal(editProfileModal);
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardCaptionInput.value,
    link: cardImageInput.value
  };
  cardsList.prepend(getCardElement(newCard));
  newPostForm.reset();
  clearValidation(newPostForm, validationConfig);
  closeModal(newPostModal);
}

// Event Listeners
editProfileButton.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileTitle.textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(editProfileModal);
});

newPostButton.addEventListener('click', () => {
  openModal(newPostModal);
});

editProfileCloseButton.addEventListener('click', () => closeModal(editProfileModal));
newPostCloseButton.addEventListener('click', () => closeModal(newPostModal));
previewCloseButton.addEventListener('click', () => closeModal(imagePreviewModal));

editProfileForm.addEventListener('submit', handleEditProfileSubmit);
newPostForm.addEventListener('submit', handleNewPostSubmit);

// Close modal when clicking outside
document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('modal_is-opened')) {
    closeModal(evt.target);
  }
});

// Initialize
renderInitialCards();
