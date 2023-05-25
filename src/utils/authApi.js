export class Api {
    constructor(baseUrl, options) {
        this._baseUrl = baseUrl
        this._options = options
    }

    _request(path, method, body, headers) {
        return fetch(
            `${this._baseUrl}/${path}`,
            {
                method,
                body: JSON.stringify(body),
                ...this._options,
                headers: {
                    ...headers,
                    ...this._options?.headers
                }
            }
        ).then(res => {
            if (res.ok) {
              return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    register(password, email) {
        return this._request('signup', 'POST', { password, email })
    }

    login(password, email) {
        return this._request('signin', 'POST', { password, email })
    }

    me() {
        return this._request(
            'users/me',
            'GET',
            undefined,
            { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` }
        )
    }
}


export const api = new Api('https://auth.nomoreparties.co', {
    headers: {
      'Content-Type': 'application/json'
    }
});
