import { useRef } from "react"
import { PopupWithForm } from "./PopupWithForm"

export const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
    const avatarRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()

        onUpdateAvatar(avatarRef.current.value)
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            name="avatarForm"
            title="Обновить аватар"
        >
            <input
                ref={avatarRef}
                className="popup__input"
                id="avatar"
                type="url"
                name="avatar"
                placeholder="Ссылка на аватар"
                minLength="2"
                required
            />
            <span
                id="avatar-error"
                className="popup__input-error popup-input-link-error"
            ></span>
        </PopupWithForm>
    )
}
