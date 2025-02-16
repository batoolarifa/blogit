import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import {apiSlice} from '../slices/apiSlice'
import blogReducer from '../slices/blogSlice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        blog: blogReducer,

        [apiSlice.reducerPath]: apiSlice.reducer,
        
        
        
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: false,
})


export default store