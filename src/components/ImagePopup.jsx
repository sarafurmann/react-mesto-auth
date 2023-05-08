export const ImagePopup = ({ card, onClose }) => {
    return (
        <div className="popup element-zoom popup_opened" id="element-zoom">
            <figure className="element-zoom__container">
                <img src={card.link} alt={card.name} className="element-zoom__img" />
                <figcaption className="element-zoom__title">{ card.name }</figcaption>
                <button onClick={onClose} type="button" aria-label="Кнопка закрыть" className="popup__btn-close"></button>
            </figure>
        </div>
    )
}
