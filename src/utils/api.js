export class Api {
    constructor(baseUrl, options) {
        this._baseUrl = baseUrl
        this._options = options
    }

    _request(path, method, body) {
        return fetch(
            `${this._baseUrl}/${path}`,
            {
                method,
                body: JSON.stringify(body),
                ...this._options
            }
        ).then(res => {
            if (res.ok) {
              return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    getInitialCards() {
        return this._request('cards')
    }

    getUser() {
        return this._request('users/me')
    }

    editUser(name, about) {
        return this._request('users/me', 'PATCH', {
            name,
            about
        })
    }

    editUserAvatar(avatar) {
        return this._request('users/me/avatar', 'PATCH', {
            avatar
        })
    }

    addCard(name, link) {
        return this._request('cards', 'POST', {
            name,
            link
        })
    }

    deleteCard(id) {
        return this._request(`cards/${id}`, 'DELETE')
    }

    likeCard(id) {
        return this._request(`cards/${id}/likes`, 'PUT')
    }

    dislikeCard(id) {
        return this._request(`cards/${id}/likes`, 'DELETE')
    }
}


export const api = new Api('https://mesto.nomoreparties.co/v1/cohort-62', {
    headers: {
      authorization: '95ee7e0b-cad2-4cc4-832a-9714fca3277c',
      'Content-Type': 'application/json'
    }
});
