import { useEffect, useState } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { PopupWithForm } from './PopupWithForm'
import { EditProfilePopup } from './EditProfilePopup'
import { ImagePopup } from './ImagePopup'
import { Main } from './Main'
import { api } from '../utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { EditAvatarPopup } from './EditAvatarPopup'
import { AppPlacePopup } from './AddPlacePopup'

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

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

    if (isLiked) {
      api.dislikeCard(card.id).then((newCard) => {
        setCards(
          (prev) => prev.map(
            (c) => c.id === newCard._id
              ? {
                  name: newCard.name,
                  link: newCard.link,
                  id: newCard._id,
                  likeCount: newCard.likes.length,
                  owner: newCard.owner,
                  likes: newCard.likes,
              }
              : c
          )
        )
      })
    } else {
      api.likeCard(card.id).then((newCard) => {
        setCards(
          (prev) => prev.map(
            (c) => c.id === newCard._id
              ? {
                  name: newCard.name,
                  link: newCard.link,
                  id: newCard._id,
                  likeCount: newCard.likes.length,
                  owner: newCard.owner,
                  likes: newCard.likes,
              }
              : c
          )
        )
      })
    }
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card.id).then(() => {
      setCards(
        (prev) => prev.filter((c) => c.id !== card.id)
      )
    })
  }

  const handleUpdateUser = ({ name, about }) => {
    return api.editUser(name, about).then(setCurrentUser)
  }

  const handleUpdateAvatar = (avatar) => {
    return api.editUserAvatar(avatar).then(setCurrentUser)
  }

  const handleAddPlace = ({ name, link }) => {
    return api.addCard(name, link).then((newCard) => {
      setCards((prev) => [
        {
          name: newCard.name,
          link: newCard.link,
          id: newCard._id,
          likeCount: newCard.likes.length,
          owner: newCard.owner,
          likes: newCard.likes,
        },
        ...prev
      ])
    })
  }

  useEffect(() => {
    Promise.all([
      api.getUser(),
      api.getInitialCards(),
    ]).then(([newUser, newCards]) => {
      setCurrentUser(newUser)
      setCards(
        newCards.map((card) => {
            return {
                name: card.name,
                link: card.link,
                id: card._id,
                likeCount: card.likes.length,
                owner: card.owner,
                likes: card.likes,
            }
        })
      )
    })
    api.getUser().then(setCurrentUser)
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
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

        <div className="popup" id="popup__confirm">
            <div className="popup__container">
                <form className="popup__form" name="confirm" noValidate>
                    <h2 className="popup__title">Вы уверены?</h2>
                    <button className="popup__btn-save popup__btn-confirm" type="submit" title="Подтвердить">Да</button>
                    <button type="button" aria-label="Кнопка закрыть" className="popup__btn-close"></button>
                </form>
            </div>
        </div>

        {selectedCard ? (
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        ) : null}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
