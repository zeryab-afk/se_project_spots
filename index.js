// Select elements for Edit Profile modal
const editProfileButton = document.querySelector('.profile__edit-btn');
const editProfileModal = document.getElementById('edit-profile-modal');
const editProfileCloseButton = editProfileModal.querySelector('.modal__close-btn');

// Select elements for New Post modal
const newPostButton = document.querySelector('.profile__add-btn');
const newPostModal = document.getElementById('new-post-modal');
const newPostCloseButton = newPostModal.querySelector('.modal__close-btn');

// Function to open modal
function openModal(modal) {
  modal.classList.add('modal_is-opened');
}

// Function to close modal
function closeModal(modal) {
  modal.classList.remove('modal_is-opened');
}

// Event listeners for Edit Profile modal
editProfileButton.addEventListener('click', () => {
  openModal(editProfileModal);
});

editProfileCloseButton.addEventListener('click', () => {
  closeModal(editProfileModal);
});

// Event listeners for New Post modal
newPostButton.addEventListener('click', () => {
  openModal(newPostModal);
});

newPostCloseButton.addEventListener('click', () => {
  closeModal(newPostModal);
});