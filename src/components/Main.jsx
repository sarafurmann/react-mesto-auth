import { useEffect, useState } from 'react'
import { api } from '../utils/Api'
import avatar from '../images/Avatar.png'
import { Card } from './Card'

export const Main = ({
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
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
    )
}