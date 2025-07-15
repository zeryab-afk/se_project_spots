// === INITIAL CARDS DATA ===
const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"
  }
];

// === SELECT ELEMENTS ===
const editProfileButton = document.querySelector('.profile__edit-btn');
const newPostButton = document.querySelector('.profile__add-btn');

const editProfileModal = document.getElementById('edit-profile-modal');
const newPostModal = document.getElementById('new-post-modal');

const editProfileCloseButton = editProfileModal.querySelector('.modal__close-btn');
const newPostCloseButton = newPostModal.querySelector('.modal__close-btn');

const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');

const profileNameInput = document.getElementById('profile-name-input');
const profileDescInput = document.getElementById('profile-description-input');
const editProfileForm = editProfileModal.querySelector('.modal__form');

const newPostForm = newPostModal.querySelector('.modal__form');
const cardImageInput = document.getElementById('card-image-input');
const cardCaptionInput = document.getElementById('card-caption-input');
const cardsList = document.querySelector('.cards__list');

// === MODAL HANDLERS ===
function openModal(modal) {
  modal.classList.add('modal_is-opened');
}

function closeModal(modal) {
  modal.classList.remove('modal_is-opened');
}

// === EVENT LISTENERS FOR OPENING ===
editProfileButton.addEventListener('click', () => {
  // ✅ Fill form fields with current profile data
  profileNameInput.value = profileName.textContent;
  profileDescInput.value = profileTitle.textContent;
  openModal(editProfileModal);
});

newPostButton.addEventListener('click', () => {
  // Optional: Clear previous inputs
  cardImageInput.value = '';
  cardCaptionInput.value = '';
  openModal(newPostModal);
});

// === EVENT LISTENERS FOR CLOSING ===
editProfileCloseButton.addEventListener('click', () => closeModal(editProfileModal));
newPostCloseButton.addEventListener('click', () => closeModal(newPostModal));

// ✅ 2. Handle Edit Profile Form Submit
editProfileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileTitle.textContent = profileDescInput.value;
  closeModal(editProfileModal);
});

// ✅ 3. Handle New Post Form Submit
newPostForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const imageUrl = cardImageInput.value;
  const caption = cardCaptionInput.value;

  const card = document.createElement('li');
  card.className = 'card';
  card.innerHTML = `
    <img src="${imageUrl}" alt="${caption}" class="card__image" />
    <div class="card__content">
      <h2 class="card__title">${caption}</h2>
      <button type="button" class="card__like-btn"></button>
    </div>
  `;

  cardsList.prepend(card);
  closeModal(newPostModal);
});

// Optional: Close modal by clicking outside
document.addEventListener('click', (e) => {
  const modals = [editProfileModal, newPostModal];
  modals.forEach((modal) => {
    if (
      modal.classList.contains('modal_is-opened') &&
      !modal.querySelector('.modal__container').contains(e.target) &&
      !e.target.closest('button')
    ) {
      closeModal(modal);
    }
  });
});

// === LOG CARD NAMES ===
initialCards.forEach((card) => {
  console.log(card.name);
});
