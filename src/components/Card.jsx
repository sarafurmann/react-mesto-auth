import { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export const Card = ({ card, onClick, onLike, onDelete }) => {
    const user = useContext(CurrentUserContext)
    const isLiked = card.likes.some((like) => like._id === user._id)
    const canDelete = user._id === card.owner._id

    const handleClick = () => {
        onClick(card);
    }

    const handleLike = (e) => {
        e.stopPropagation()
        onLike(card)
    }

    const handleDelete = (e) => {
        e.stopPropagation()
        onDelete(card)
    }

    return (
        <li onClick={handleClick} className="elements__item">
            <img src={card.link} alt="Карачаевск" className="elements__img" />
            <div className="elements__info">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__like">
                    <button onClick={handleLike} type="button" className={`elements__info-btn${isLiked ? ' elements__info-btn_liked' : ''}`} aria-label="Лайк"></button>
                    <p className="elements__number-like">{card.likeCount}</p>
                </div>
            </div>
            {canDelete ? (
                <button onClick={handleDelete} type="button" className="elements__delete-btn"></button>
            ) : null}
        </li>
    )
}