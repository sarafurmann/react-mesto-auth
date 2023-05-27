import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { Header } from './Header'
import { Footer } from './Footer'
import { EditProfilePopup } from './EditProfilePopup'
import { ImagePopup } from './ImagePopup'
import { Main } from './Main'
import { api } from '../utils/api'
import { api as authApi } from '../utils/authApi'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { EditAvatarPopup } from './EditAvatarPopup'
import { AppPlacePopup } from './AddPlacePopup'
import { mapCard } from '../utils/utils'
import { PopupWithForm } from './PopupWithForm'
import { Register } from './Register'
import { Login } from './Login'
import { ProtectedRoute } from './ProtectedRoute'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

  const [email, setEmail] = useState('')

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard(null)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    const action = isLiked ? api.dislikeCard.bind(api) : api.likeCard.bind(api)

    action(card.id).then((newCard) => {
      setCards(
        (prev) => prev.map(
          (c) => c.id === newCard._id
            ? mapCard(newCard)
            : c
        )
      )
    })
    .catch(console.error)
  }

  const handleCardDelete = (card) => {
    api
      .deleteCard(card.id)
      .then(() => {
        setCards(
          (prev) => prev.filter((c) => c.id !== card.id)
        )
      })
      .catch(console.error)
  }

  const handleUpdateUser = ({ name, about }) => {
    api
      .editUser(name, about)
      .then(setCurrentUser)
      .then(closeAllPopups)
      .catch(console.error)
  }

  const handleUpdateAvatar = (avatar) => {
    api
      .editUserAvatar(avatar)
      .then(setCurrentUser)
      .then(closeAllPopups)
      .catch(console.error)
  }

  const signOut = () => {
      localStorage.removeItem('jwt')
      navigate('/sign-in')
  }

  const handleAddPlace = ({ name, link }) => {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards((prev) => [
          mapCard(newCard),
          ...prev
        ])
      })
      .then(closeAllPopups)
      .catch(console.error)
  }

  useEffect(() => {
      authApi
        .me()
        .then(({ data }) => setEmail(data.email))
        .catch(console.error)
  }, [location])

  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      return
    }

    Promise.all([
      api.getUser(),
      api.getInitialCards(),
    ]).then(([newUser, newCards]) => {
      setCurrentUser(newUser)
      setCards(
        newCards.map(mapCard)
      )
    })
    .catch(console.error)
  }, [location])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onSignOut={signOut} email={email} />
        <Routes>
          <Route
            path='/'
            element={(
              <ProtectedRoute>
                <Main
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRoute>
            )}
          />
          <Route path='/sign-up' element={<Register />} />
          <Route path='/sign-in' element={<Login />} />
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AppPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
        />

        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
        >
          <button className="popup__btn-save popup__btn-confirm" type="submit" title="Подтвердить">Да</button>
          <button type="button" aria-label="Кнопка закрыть" className="popup__btn-close"></button>
        </PopupWithForm>

        {selectedCard ? (
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        ) : null}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
