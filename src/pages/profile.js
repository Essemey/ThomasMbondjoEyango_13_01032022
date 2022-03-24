import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router"
import UpdateNameForm from "../components/UpdateNameForm"
import { getProfile } from "../thunks/getProfileThunk"
import { checkToken } from "../utils/checkToken"
import { signOut } from "../utils/signOut"


export default function Profile() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { state } = useLocation()

    const { profile, loading } = useSelector(state => state.user)

    const [editForm, setEditForm] = useState(false)

    const localData = JSON.parse(localStorage.getItem('user_token'))
    const handleClickEdit = (e) => {
        e.preventDefault()
        setEditForm(true)
    }

    console.log(state)

    useEffect(() => {
        const [action, token] = checkToken(state?.token, localData?.token, profile)
        if (action === 'INITIALIZATION') {
            dispatch(getProfile(token))
                .unwrap()
                .then(({ body }) => localStorage.setItem('user_token', JSON.stringify({ firstName: body.firstName, token: token })))
                .catch(() => {
                    localStorage.removeItem('user_token');
                    navigate('/login')
                })
            return
        }
        if (action === 'REFRESH') return dispatch(getProfile(token))
        if (action === 'NAVIGATE') return


        signOut(dispatch)
        navigate('/login')
    }, [])

    if (loading || !profile) {
        return <h1>Loading...</h1>
    }

    return <main className="main bg-dark">
        <div className="header">
            <h1>Welcome back<br />{profile.firstName} {profile.lastName}</h1>
            {editForm ?
                <UpdateNameForm edit={setEditForm} profile={profile} dispatch={dispatch} token={state?.token || localData?.token} />
                : <button className="edit-button" onClick={handleClickEdit}>Edit Name</button>
            }
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                <p className="account-amount">$2,082.79</p>
                <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
            </div>
        </section>
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                <p className="account-amount">$10,928.42</p>
                <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
            </div>
        </section>
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                <p className="account-amount">$184.30</p>
                <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
            </div>
        </section>
    </main>
}