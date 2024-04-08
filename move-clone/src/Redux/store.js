import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './slices/users'
import ordersReducer from './slices/orders'
import DriverReducer from './slices/drivers'
import reviewReducer from './slices/review'

const store = configureStore({
    reducer: {
        users: usersReducer, 
        orders: ordersReducer,
        driver:DriverReducer,
        review:reviewReducer,
    }
})



export default store;
