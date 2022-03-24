import { updateProfile } from "../thunks/updateProfileThunk"


export default function UpdateNameForm({ edit, profile, dispatch, token }) {


    const handleSubmit = (e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        for (const property in data) { //Si jamais un champ est vide
            if (data[property] === '') data[property] = profile[property]
        }
        dispatch(updateProfile({ form: data, token }))
        edit(false)
    }

    return <form id="editNameForm" onSubmit={handleSubmit}>
        <div className="edit_inputs">
            <input type="text" name="firstName" placeholder={profile.firstName} />
            <input type="text" name="lastName" placeholder={profile.lastName} />
        </div>
        <div className="updateForm_buttons">
            <button type="submit">Save</button>
            <button onClick={() => edit(false)}>Cancel</button>
        </div>
    </form>
}