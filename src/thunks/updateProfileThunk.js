import { createAsyncThunk } from "@reduxjs/toolkit";


export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async ({ form, token }, { rejectWithValue }) => {
        try {
            const res = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                body: JSON.stringify(form),
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            })
            const data = await res.json()
            if (!res.ok) {
                throw `${data.message}/${data.status}`
            }
            console.log(data)
            return data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

