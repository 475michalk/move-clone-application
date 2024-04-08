import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import axios from 'axios'


const initialState = {
    User: [],

}

export const fetchUser = createAsyncThunk(
    'User/fetchUser',

    async (_, thunkAPI) => {

        try {
            const response = await axios.get('https://localhost:7185/api/User');
            console.log('Data from server user:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching data from server:', error.message);
            throw error;
        }
    }
);


export const fetchUserById = createAsyncThunk(
    'User/fetchUserById',

    async (userId, thunkAPI) => {

        try {
            const response = await axios.get(`https://localhost:7185/api/User/${userId}`);
            console.log('Data from server user:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching data from server:', error.message);
            throw error;
        }
    }
);



export const addUserToServer = createAsyncThunk(
    'User/addUserToServer',
    async (payload) => {
        const { username, email, password } = payload;
        try {
            debugger
            const response = await axios.post('https://localhost:7185/api/User', {
                username: username,
                email: email,
                password: password
            });
            console.log('User added successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error adding user to server:', error.message);
            return isRejectedWithValue(error);
        }
    }
);

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        User: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.loading = 'pending';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.User = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {

                state.status = 'rejected';
                state.error = action.error.message;
            })
            .addCase(fetchUserById.pending, (state, action) => {
                state.loading = 'pending';
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.User = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {

                state.status = 'rejected';
                state.error = action.error.message;
            })
            .addCase(addUserToServer.pending, (state, action) => {
                state.loading = 'pending';
            })
            .addCase(addUserToServer.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.User = action.payload;
            })
            .addCase(addUserToServer.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            });
    },
});
export const { } = userSlice.actions
export default userSlice.reducer
