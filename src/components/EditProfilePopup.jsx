import { useState, useContext, useEffect } from "react"
import { PopupWithForm } from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

export const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
    const user = useContext(CurrentUserContext)
    const [name, setName] = useState('')
    const [about, setAbout] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        onUpdateUser({
            name,
            about,
        })
    }

    const handleChange = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value)
        } else if (e.target.name === 'job') {
            setAbout(e.target.value)
        }
    }

    useEffect(() => {
        setName(user.name ?? '');
        setAbout(user.about ?? '');
    }, [user, isOpen])

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            name="profile"
            title="Редактировать профиль"
        >
            <div className="popup__input-wrapper">
                <input
                    value={name}
                    onChange={handleChange}
                    className="popup__input"
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Имя"
                    minLength="2"
                    maxLength="40"
                    required
                />
                <span
                    id="name-error"
                    className="popup__input-error name-error"
                ></span>
            </div>
            <div className="popup__input-wrapper">
                <input
                    value={about}
                    onChange={handleChange}
                    className="popup__input"
                    id="job"
                    type="text"
                    name="job"
                    placeholder="О себе"
                    minLength="2"
                    maxLength="200"
                    required
                />
                <span
                    id="job-error"
                    className="popup__input-error job-error"
                ></span>
            </div>
        </PopupWithForm>
    )
}
