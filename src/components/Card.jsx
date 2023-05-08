export const Card = ({ card, onClick }) => {
    const handleClick = () => {
        onClick(card);
    }

    return (
        <li onClick={handleClick} className="elements__item">
            <img src={card.link} alt="Карачаевск" className="elements__img" />
            <div className="elements__info">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__like">
                    <button type="button" className={`elements__info-btn${card.isLiked ? ' elements__info-btn_liked' : ''}`} aria-label="Лайк"></button>
                    <p className="elements__number-like">{card.likeCount}</p>
                </div>
            </div>
            {card.canDelete ? (
                <button type="button" className="elements__delete-btn"></button>
            ) : null}
        </li>
    )
}