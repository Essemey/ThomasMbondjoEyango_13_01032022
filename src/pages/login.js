import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { getToken } from "../utils/getToken"



export default function LogIn() {

    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('user_token')) {
            navigate('/profile')
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        getToken(data)
            .then(token => navigate('/profile', { state: { token } }))
            .catch(err => setError(err.message))
    }

    return <main className="main bg-dark">
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label htmlFor="username">Username</label
                    ><input type="text" id="username" name="email" />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label
                    ><input type="password" id="password" name="password" />
                </div>
                {error && <div className="login_error">{error}</div>}
                <div className="input-remember">
                    <input type="checkbox" id="remember-me" /><label htmlFor="remember-me"
                    >Remember me</label
                    >
                </div>
                <button type="submit" className="sign-in-button">Sign In</button>
            </form>
        </section>
    </main>
}