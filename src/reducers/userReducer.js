import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "../thunks/getProfileThunk";
import { updateProfile } from "../thunks/updateProfileThunk";



const userSlice = createSlice({
    name: 'user', //Nom qui précède les actions 'user/action'
    initialState: {
        profile: null,
        loading: false
    },
    reducers: {
        logout: state => ({ ...state, profile: null })
    },
    extraReducers: {
        [getProfile.pending]: (state) => ({ ...state, loading: true }),
        [getProfile.fulfilled]: (state, { payload }) => ({ ...state, loading: false, profile: payload.body }),
        [getProfile.rejected]: state => ({ ...state, loading: false }),

        [updateProfile.pending]: state => ({ ...state, loading: true }),
        [updateProfile.fulfilled]: (state, { payload }) => ({ ...state, loading: false, profile: payload.body }),
        [updateProfile.rejected]: state => ({ ...state, loading: false })
    },
})


export const { logout } = userSlice.actions
export default userSlice.reducer;