import { useState } from 'react'
import { Header } from './Header';
import { Footer } from './Footer';
import { PopupWithForm } from './PopupWithForm'
import { ImagePopup } from './ImagePopup'
import { Main } from './Main';

function App() {
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

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          name="profile"
          title="Редактировать профиль"
      >
          <div className="popup__input-wrapper">
              <input className="popup__input" id="name" type="text" name="name" placeholder="Имя" minLength="2" maxLength="40" required />
              <span id="name-error" className="popup__input-error name-error"></span>
          </div>
          <div className="popup__input-wrapper">
              <input className="popup__input" id="job" type="text" name="job" placeholder="О себе" minLength="2" maxLength="200" required />
              <span id="job-error" className="popup__input-error job-error"></span>
          </div>
      </PopupWithForm>

      <PopupWithForm
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          name="avatarForm"
          title="Обновить аватар"
      >
          <input className="popup__input" id="avatar" type="url" name="avatar" placeholder="Ссылка на аватар" minLength="2" required />
          <span id="avatar-error" className="popup__input-error popup-input-link-error"></span>
      </PopupWithForm>

      <PopupWithForm
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          name="newpost"
          title="Новое место"
      >
          <div className="popup__input-wrapper">
              <input className="popup__input" id="postname" type="text" name="postname" placeholder="Название" minLength="2" maxLength="30" required />
              <span id="postname-error" className="popup__input-error postname-error"></span>
          </div>
          <div className="popup__input-wrapper">
              <input type="url" className="popup__input" id="postlink" name="postlink" placeholder="Ссылка на картинку" required />
              <span id="postlink-error" className="popup__input-error postlink-error"></span>
          </div>    
      </PopupWithForm>

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
  );
}

export default App;
