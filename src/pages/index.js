import './index.css';
import { enableValidation } from '../scripts/validation.js';

// Image imports
import logo from '../images/logo.svg';
import avatar from '../images/avatar.jpg';
import pencil from '../images/pencil.svg';
import plus from '../images/plus.svg';
import photo1 from '../images/1-photo.jpg';
import photo2 from '../images/2-photo.jpg';
import photo3 from '../images/3-photo.jpg';
import photo4 from '../images/4-photo.jpg';
import photo5 from '../images/5-photo.jpg';
import photo6 from '../images/6-photo.jpg';

// Assign images to DOM elements
document.querySelector('.header__logo').src = logo;
document.querySelector('.profile__avatar').src = avatar;
document.querySelector('.profile__edit-btn img').src = pencil;
document.querySelector('.profile__add-btn img').src = plus;

// Initial cards data
const initialCards = [
  { name: 'Val Thorens', link: photo1 },
  { name: 'Restaurant Terrace', link: photo2 },
  { name: 'Outdoor Cafe', link: photo3 },
  { name: 'Bridge in Forest', link: photo4 },
  { name: 'Tunnel Morning Light', link: photo5 },
  { name: 'Mountain House', link: photo6 }
];

// DOM references
const editProfileModal = document.getElementById('edit-profile-modal');
const newPostModal = document.getElementById('new-post-modal');
const imagePreviewModal = document.getElementById('image-preview-modal');

const editProfileButton = document.querySelector('.profile__edit-btn');
const newPostButton = document.querySelector('.profile__add-btn');
const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.getElementById('card-template').content;

const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');
const profileNameInput = document.getElementById('profile-name-input');
const profileDescriptionInput = document.getElementById('profile-description-input');
const cardImageInput = document.getElementById('card-image-input');
const cardCaptionInput = document.getElementById('card-caption-input');
const previewImage = imagePreviewModal.querySelector('.modal__preview-image');
const previewCaption = imagePreviewModal.querySelector('.modal__caption');

// Modal functions
function openModal(modal) {
  modal.classList.add('modal_is-opened');
  document.addEventListener('keydown', closeOnEscape);
}

function closeModal(modal) {
  modal.classList.remove('modal_is-opened');
  document.removeEventListener('keydown', closeOnEscape);
}

function closeOnEscape(evt) {
  if (evt.key === 'Escape') {
    const opened = document.querySelector('.modal_is-opened');
    if (opened) closeModal(opened);
  }
}

// Close modal event listeners
document.querySelectorAll('.modal__close-btn').forEach(btn =>
  btn.addEventListener('click', () => closeModal(btn.closest('.modal')))
);

document.addEventListener('click', evt => {
  if (evt.target.classList.contains('modal_is-opened')) closeModal(evt.target);
});

// Card creation function
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

  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('card__like-btn_active');
  });

  deleteBtn.addEventListener('click', () => card.remove());

  img.addEventListener('click', () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(imagePreviewModal);
  });

  return cardEl;
}

// Render initial cards
initialCards.forEach(card => {
  cardsList.appendChild(createCard(card));
});

// Form handlers
document.getElementById('edit-profile-form').addEventListener('submit', e => {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileTitle.textContent = profileDescriptionInput.value;
  closeModal(editProfileModal);
});

document.getElementById('new-post-form').addEventListener('submit', e => {
  e.preventDefault();
  const newCard = {
    name: cardCaptionInput.value,
    link: cardImageInput.value
  };
  cardsList.prepend(createCard(newCard));
  e.target.reset();
  closeModal(newPostModal);
});

// Open modal event listeners
editProfileButton.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileTitle.textContent;
  openModal(editProfileModal);
});

newPostButton.addEventListener('click', () => openModal(newPostModal));
newPostCloseButton.addEventListener('click', () => closeModal(newPostModal));
previewCloseButton.addEventListener('click', () => closeModal(imagePreviewModal));

document.getElementById('edit-profile-form').addEventListener('submit', handleEditProfileSubmit);
document.getElementById('new-post-form').addEventListener('submit', handleNewPostSubmit);

// Close modal when clicking outside
document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('modal_is-opened')) {
    closeModal(evt.target);
  }
});

// Initialize
renderInitialCards();
