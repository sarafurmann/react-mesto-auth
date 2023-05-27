import { useState } from 'react'
import { api } from '../utils/authApi'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        api
            .login(password, email)
            .then((data) => {
                localStorage.setItem('jwt', data.token)
                navigate('/')
            })
            .catch(console.error)
    }

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h1 className="auth-form__welcome">Вход</h1>
            <input
                className="auth-form__input form__input_user_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                required
            />
            <input
                className="auth-form__input form__input_user_password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Пароль"
                required
            />
            <button type="submit" className="auth-form__submit-button">Войти</button>
        </form>
    )
}