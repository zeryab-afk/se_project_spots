// Select modal elements
const editProfileButton = document.querySelector('.profile__edit-btn');
const newPostButton = document.querySelector('.profile__add-btn');

const editProfileModal = document.getElementById('edit-profile-modal');
const newPostModal = document.getElementById('new-post-modal');

const editProfileCloseButton = editProfileModal.querySelector('.modal__close-btn');
const newPostCloseButton = newPostModal.querySelector('.modal__close-btn');

// Open modal
function openModal(modal) {
  modal.classList.add('modal_is-opened');
}

// Close modal
function closeModal(modal) {
  modal.classList.remove('modal_is-opened');
}

// Event listeners
editProfileButton.addEventListener('click', () => openModal(editProfileModal));
editProfileCloseButton.addEventListener('click', () => closeModal(editProfileModal));

newPostButton.addEventListener('click', () => openModal(newPostModal));
newPostCloseButton.addEventListener('click', () => closeModal(newPostModal));

// Optional: Close modals when clicking outside the container
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
