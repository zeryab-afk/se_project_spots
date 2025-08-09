// 📁 api.js
class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
    this.userInfoUrl = `${this.baseUrl}/users/me`;
  }

  // ✅ Universal request method
  _request(endpoint, options = {}) {
    return fetch(`${this.baseUrl}${endpoint}`, {
      headers: this.headers,
      ...options
    }).then(this._handleResponse);
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  getInitialCards() {
    return this._request('/cards');
  }

  getUserInfo() {
    return this._request('/users/me');
  }

  editUserInfo({ name, about }) {
    return this._request('/users/me', {
      method: 'PATCH',
      body: JSON.stringify({ name, about })
    });
  }

  updateUserAvatar(avatar) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({ avatar })
    });
  }

  addCard({ name, link }) {
    return this._request('/cards', {
      method: 'POST',
      body: JSON.stringify({ name, link })
    });
  }

  removeCard(cardId) {
    return this._request(`/cards/${cardId}`, { method: 'DELETE' });
  }

  changeLikeStatus(cardId, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';
    return this._request(`/cards/${cardId}/likes`, { method });
  }

  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }
}

export default Api;
