// 📁 api.js

class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;

    // 🔗 Set base endpoint for user info
    this.userInfoUrl = `${this.baseUrl}/users/me`;
  }

  // 📦 Fetch both initial cards and user profile
  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  // 🖼 Get initial cards
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    }).then(this._handleResponse);
  }

  // 👤 Get user profile data
  getUserInfo() {
    return fetch(this.userInfoUrl, {
      headers: this.headers
    }).then(this._handleResponse);
  }

  // ✏️ Edit user name and about
  editUserInfo({ name, about }) {
    return fetch(this.userInfoUrl, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ name, about })
    }).then(this._handleResponse);
  }

  // 🖼 Update avatar
  updateUserAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ avatar })
    }).then(this._handleResponse);
  }

  // 🗑 Delete a card by ID
  removeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    }).then(this._handleResponse);
  }

  // ❤️ Toggle like status (like/unlike)
  changeLikeStatus(cardId, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method,
      headers: this.headers
    }).then(this._handleResponse);
  }

  // ✅ Reusable response handler
  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }
}

export default Api;
