import { useEffect, useState } from 'react'
import { PopupWithForm } from './PopupWithForm'
import { ImagePopup } from './ImagePopup'
import { api } from '../utils/Api'
import avatar from '../images/Avatar.png'
import { Card } from './Card'

export const Main = ({
    isEditProfilePopupOpen,
    isEditAvatarPopupOpen,
    isAddPlacePopupOpen,
    selectedCard,
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onClose,
}) => {
    const [userName, setUserName] = useState('Жак-Ив Кусто')
    const [userDescription, setUserDescription] = useState('Исследователь океана')
    const [userAvatar, setUserAvatar] = useState(avatar)
    const [cards, setCards] = useState([])

    useEffect(() => {
        Promise.all([
            api.getUser(),
            api.getInitialCards()
        ]).then(([user, cards]) => {
            setUserAvatar(user.avatar)
            setUserName(user.name)
            setUserDescription(user.about)
            setCards(
                cards.map((card) => {
                    return {
                        name: card.name,
                        link: card.link,
                        id: card._id,
                        likeCount: card.likes.length,
                        isLiked: card.likes.some((like) => like._id === user._id),
                        canDelete: user._id === card.owner._id
                    }
                })
            )
        }).catch(console.error);
    }, [])

    return (
        <>
            <main className="content">
            <section className="profile">
                <div className="profile__content">
                    <img onClick={onEditAvatar} src={userAvatar} alt="Аватар" className="profile__avatar-img" />
                    <div className="profile__info">
                        <div className="profile__info-about">
                            <h1 id="profile__info-name" className="profile__info-name">{userName}</h1>
                            <p className="profile__info-job">{userDescription}</p>
                        </div>
                        <button onClick={onEditProfile} type="button" className="profile__info-button" aria-label="Редактировать профиль"></button>
                    </div>
                </div>
                <button onClick={onAddPlace} type="button" className="profile__add-button" aria-label="Добавить пост"></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => (
                        <Card card={card} onClick={onCardClick} key={card.id} />
                    ))}
                </ul>
            </section>
            </main>

            <PopupWithForm
                isOpen={isEditProfilePopupOpen}
                onClose={onClose}
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
                onClose={onClose}
                name="avatarForm"
                title="Обновить аватар"
            >
                <input className="popup__input" id="avatar" type="url" name="avatar" placeholder="Ссылка на аватар" minLength="2" required />
                <span id="avatar-error" className="popup__input-error popup-input-link-error"></span>
            </PopupWithForm>

            <PopupWithForm
                isOpen={isAddPlacePopupOpen}
                onClose={onClose}
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
                <ImagePopup card={selectedCard} onClose={onClose} />
            ) : null}
        </>
    )
}