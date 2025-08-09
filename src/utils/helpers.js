// 📁 utils/helpers.js

/**
 * Dynamically sets the button text based on loading state.
 *
 * @param {HTMLElement} button - The submit button element
 * @param {boolean} isLoading - Whether a request is in progress
 * @param {string} loadingText - Text to show during loading
 * @param {string} defaultText - Text to reset to after loading
 */
export function setButtonText(button, isLoading, loadingText = 'Saving...', defaultText = 'Save') {
  if (button) {
    button.textContent = isLoading ? loadingText : defaultText;
  }
}
