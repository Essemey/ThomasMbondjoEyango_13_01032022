import { logout } from "../reducers/userReducer"


export const signOut = (dispatch) => {
    localStorage.removeItem('user_token')
    dispatch(logout())
}