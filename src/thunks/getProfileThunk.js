import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProfile = createAsyncThunk(
    'user/getProfile',
    async (token, { rejectWithValue }) => {
        try {
            const res = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            const data = await res.json()
            if (!res.ok) {
                throw `${data.message}/${data.status}`
            }
            return data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)