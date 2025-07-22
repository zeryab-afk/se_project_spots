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

// Modal Functions
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
    const openedModal = document.querySelector('.modal_is-opened');
    closeModal(openedModal);
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

  // Like Button Functionality
  likeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    likeButton.classList.toggle('card__like-btn_active');
  });

  // Delete Button Functionality
  deleteButton.addEventListener('click', (e) => {
    e.stopPropagation();
    card.remove();
  });

  // Image Click for Preview Modal
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
  cardsList.prepend(getCardElement(newCard)); // Prepend new card
  evt.target.reset();
  closeModal(newPostModal);
}

// Event Listeners
editProfileButton.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileTitle.textContent;
  openModal(editProfileModal);
});

editProfileCloseButton.addEventListener('click', () => closeModal(editProfileModal));
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
