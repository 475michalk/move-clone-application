import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
  data: [],
  loading: 'idle',
  error: null
};
// Redux action
export const fetchDriver = createAsyncThunk(
  'driver/fetchDriver',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('https://localhost:7185/api/driver');
      console.log('Data from server user:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data from server:', error.message);
      throw error;
    }
  }
);



export const fetchDriverCoordinates = createAsyncThunk(
  'driver/fetchDriverCoordinates',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('https://localhost:7185/api/driver');
      console.log('Data from server user:', response.data);

      // ממיר את הנתונים למערך של מיקומים עם lat ו־lng
      const coordinates = response.data.map(driver => ({
        id: driver.id,
        lat: driver.lat,
        lng: driver.lng,
        name: driver.nameDriver
      }));

      console.log('Driver coordinates:', coordinates);
      return coordinates;
    } catch (error) {
      console.error('Error fetching data from server:', error.message);
      throw error;
    }
  }
);


export const fetchDriverById = createAsyncThunk(
  'Review/fetchReviewById',
  async (id, thunkAPI) => {
      console.log('Fetching review by ID:', id);

      try {
          const response = await axios.get(`https://localhost:7185/api/driver/${id}`);
          console.log('Data from server Review:', response.data);
          return response.data;
      } catch (error) {
          console.error('Error fetching data from server:', error.message);
          throw error;
      }
  }
)


export const addDriverToServer = createAsyncThunk(
  'Driver/addDriverToServer',
  async (payload) => {

    const { nameDriver, status, lat, lng, email, Password, phoneNumber } = payload;
    
    try {
      const response = await axios.post('https://localhost:7185/api/Driver', {
        "NameDriver": nameDriver,
        "Status": "true",
        "Lat": lat,
        "Lng": lng,
        "Email": email,
        "Password": Password,
        "PhoneNumber": phoneNumber,
      });
      console.log('Driver added successfully:', response.data);
      const verificationCode=response.data.verificationCode;

      return { ...response.data, verificationCode };
    } catch (error) {
      console.error('Error adding Driver to server:', error.message);
      return isRejectedWithValue(error);
    }
  }
);




// export const verifyVerificationCode = createAsyncThunk(
  
//   'Driver/verifyVerificationCode',
//   async (payload) => {
//     debugger
//     const { email, code } = payload;
//     try {
//       const response = await axios.post('https://localhost:7185/api/Driver', {
//         email: email,
//         VerificationCode: code
//       });
//       console.log('Verification code verification:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error verifying verification code:', error.message);
//       return isRejectedWithValue(error);
//     }
//   }
// );



const DriverSlice = createSlice({
  name: 'driver',
  initialState: {
    data: [],
    loading: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDriver.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(fetchDriver.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(fetchDriver.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message;
      })
    
      .addCase(fetchDriverCoordinates.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(fetchDriverCoordinates.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(fetchDriverCoordinates.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message;
      });
  }
});


export const { } = DriverSlice.actions
export default DriverSlice.reducer

