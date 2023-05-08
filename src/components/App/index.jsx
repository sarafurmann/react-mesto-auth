import { useState } from 'react'
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Main } from '../Main';

import './App.css';

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
        isEditProfilePopupOpen={isEditProfilePopupOpen}
        isEditAvatarPopupOpen={isEditAvatarPopupOpen}
        isAddPlacePopupOpen={isAddPlacePopupOpen}
        selectedCard={selectedCard}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onClose={closeAllPopups}
      />
      <Footer />
    </div>
  );
}

export default App;
