import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import '../index.css'

import logo from '../images/logo.svg'
import { useEffect, useState } from 'react'
import { api } from '../utils/authApi'

export const Header = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')

    const signOut = () => {
        localStorage.removeItem('jwt')
        navigate('/sign-in')
    }

    useEffect(() => {
        api.me().then(({ data }) => setEmail(data.email))
    }, [email])

    return (
        <header className="header">
            <div className="header__routes">
                <img src={logo} alt="Логотип" className="header__logo" />

                <Routes>
                    <Route
                        path='/'
                        element={(
                            <div className='header__info'>
                                <span>{email}</span>
                                <button className="header__route" onClick={signOut} type='button'>Выйти</button>
                            </div>
                        )}
                    />
                    <Route path='/sign-up' element={<Link to="/sign-in" className="header__route">Войти</Link>} />
                    <Route path='/sign-in' element={<Link to="/sign-up" className="header__route">Регистрация</Link>} />
                </Routes>
            </div>
        </header>
    )
}