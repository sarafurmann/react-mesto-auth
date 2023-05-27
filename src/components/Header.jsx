import { Routes, Route, Link } from 'react-router-dom'

import logo from '../images/logo.svg'

export const Header = ({ onSignOut, email }) => {
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
                                <button className="header__route" onClick={onSignOut} type='button'>Выйти</button>
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