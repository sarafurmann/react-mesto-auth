import { useState } from "react"
import { PopupWithForm } from "./PopupWithForm"

export const AppPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
    const [name, setName] = useState('')
    const [link, setLink] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        onAddPlace({
            name,
            link
        })
    }

    const handleChange = (e) => {
        if (e.target.name === 'postname') {
            setName(e.target.value)
        } else if (e.target.name === 'postlink') {
            setLink(e.target.value)
        }
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            name="newpost"
            title="Новое место"
        >
            <div className="popup__input-wrapper">
                <input
                    value={name}
                    onChange={handleChange}
                    className="popup__input"
                    id="postname"
                    type="text"
                    name="postname"
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    required
                />
                <span
                    id="postname-error"
                    className="popup__input-error postname-error"
                ></span>
            </div>
            <div className="popup__input-wrapper">
                <input
                    value={link}
                    onChange={handleChange}
                    type="url"
                    className="popup__input"
                    id="postlink"
                    name="postlink"
                    placeholder="Ссылка на картинку"
                    required
                />
                <span
                    id="postlink-error"
                    className="popup__input-error postlink-error"
                ></span>
            </div> 
        </PopupWithForm>
    )
}
