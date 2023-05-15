import { useContext } from 'react'
import { Card } from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export const Main = ({
    cards,
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onCardLike,
    onCardDelete,
}) => {
    const user = useContext(CurrentUserContext)

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__content">
                    <img onClick={onEditAvatar} src={user.avatar} alt="Аватар" className="profile__avatar-img" />
                    <div className="profile__info">
                        <div className="profile__info-about">
                            <h1 id="profile__info-name" className="profile__info-name">{user.name}</h1>
                            <p className="profile__info-job">{user.about}</p>
                        </div>
                        <button onClick={onEditProfile} type="button" className="profile__info-button" aria-label="Редактировать профиль"></button>
                    </div>
                </div>
                <button onClick={onAddPlace} type="button" className="profile__add-button" aria-label="Добавить пост"></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => (
                        <Card
                            card={card}
                            onLike={onCardLike}
                            onClick={onCardClick}
                            onDelete={onCardDelete}
                            key={card.id}
                        />
                    ))}
                </ul>
            </section>
        </main>
    )
}