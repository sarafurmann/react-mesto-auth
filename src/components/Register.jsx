import { useState } from 'react'
import { api } from '../utils/authApi'
import '../index.css'
import { useNavigate, Link } from 'react-router-dom'

export const Register = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        api
            .register(password, email)
            .then(() => navigate('/sign-in'))
    }
    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h1 className="auth-form__welcome">Регистрация</h1>
            <input
                className="auth-form__input form__input_user_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                minLength="2"
                maxLength="40"
                placeholder="Email"
            />
            <input
                className="auth-form__input form__input_user_password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                minLength="6"
                maxLength="200"
                placeholder="Пароль"
            />
            <button type="submit" className="auth-form__submit-button">Зарегистрироваться</button>
            <Link className="auth-form__text" to="/sign-in">Уже зарегестрированы? Войти</Link>
        </form>
    )
}