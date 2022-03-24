import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import argentBankLogo from '../../public/img/argentBankLogo.png'
import { LogoutIcon } from '../icons/logoutIcon'
import { UserIcon } from '../icons/userIcon'
import { signOut } from '../utils/signOut'

export function Header() {

    const [auth, setAuth] = useState({ firstName: null, state: false })
    const dispatch = useDispatch()
    const { profile } = useSelector(state => state.user)

    useEffect(() => {

        //Change name in header
        if (auth.firstName && profile && (auth.firstName !== profile.firstName)) {
            setAuth(s => ({ ...s, firstName: profile.firstName }))
        }

        if (localStorage.getItem('user_token')) {
            if (!auth.state) {
                const firstName = JSON.parse(localStorage.getItem('user_token')).firstName
                setAuth(s => ({ ...s, state: true, firstName: firstName }))
            }
            return
        }

        if (!localStorage.getItem('user_token') && auth.state) {
            setAuth(s => ({ ...s, state: false, firstName: null }))
        }

    }, [profile])

    return <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
            <img
                className="main-nav-logo-image"
                src={argentBankLogo}
                alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
            {!auth.state
                ? <Link className="main-nav-item" to="/login">
                    <UserIcon />
                    Sign In
                </Link>
                : <div>
                    <Link to="/profile"><UserIcon />{auth.firstName}</Link>
                    <Link onClick={() => signOut(dispatch)} className="main-nav-item logout" to="/">
                        <LogoutIcon />
                        Sign Out
                    </Link>
                </div>
            }
        </div>
    </nav>
}