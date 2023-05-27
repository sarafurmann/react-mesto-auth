export const PopupWithForm = ({
    isOpen,
    name,
    title,
    onClose,
    onSubmit,
    children
}) => {
    return (
        <div className={`popup${isOpen ? ' popup_opened' : ''}`}>
            <div className="popup__container">
                <form onSubmit={onSubmit} className="popup__form" name={name}>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button className="popup__btn-save" type="submit" title="Сохранить">Сохранить</button>
                </form>
                <button onClick={onClose} type="button" aria-label="Кнопка закрыть" className="popup__btn-close"></button>
            </div>
        </div>
    )
}
