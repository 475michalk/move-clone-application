import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    Review: [],
    addedReviews: [],
    ratedOrderIds: []
}

export const fetchReview = createAsyncThunk(
    'Review/fetchReview',
    async (thunkAPI) => {
        console.log('in fetchReview');

        try {
            const response = await axios.get('https://localhost:7185/api/Review');
            console.log('Data from server Review:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching data from server:', error.message);
            throw error;
        }
    }
)

export const fetchReviewById = createAsyncThunk(
    'Review/fetchReviewById',
    async (id, thunkAPI) => {
        console.log('Fetching review by ID:', id);

        try {
            const response = await axios.get(`https://localhost:7185/api/Review/${id}`);
            console.log('Data from server Review:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching data from server:', error.message);
            throw error;
        }
    }
)

export const addReviewToServer = createAsyncThunk(
    'Review/addReviewToServer',
    async ({ orderid, userid,driveid, date, rating, comment }) => {
        try {
            debugger;
            const response = await axios.post('https://localhost:7185/api/Review', {
                orderId: orderid,
                userId: userid,
                driverId:driveid,
                "date": date,
                "rating": rating,
                "comment": comment,
            });
            console.log('Review added successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error adding Review to server:', error.message);
            return isRejectedWithValue(error);
        }
    }
);

export const ReviewSlice = createSlice({
    name: 'Review',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReview.pending, (state, action) => {
                state.loading = 'pending';
            })
            .addCase(fetchReview.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.Review = action.payload;
            })
            .addCase(fetchReview.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
            .addCase(addReviewToServer.pending, (state, action) => {
                state.loading = 'pending';
            })
            .addCase(addReviewToServer.fulfilled, (state, action) => {
                state.loading = 'fulfilled';
                state.data = action.payload;
                state.ratedOrderIds.push(action.payload.orderId); // הוספת מזהה הזמנה שכבר דורגה למערך
            })
            .addCase(addReviewToServer.rejected, (state, action) => {
                state.loading = 'rejected';
                state.error = action.error.message;
            });
    },
});

export const { } = ReviewSlice.actions
export default ReviewSlice.reducer
