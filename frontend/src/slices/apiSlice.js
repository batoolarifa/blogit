import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL,
                                    credentials: 'include',
                                    prepareHeaders: (headers) => {
                                        headers.set('Content-Type', 'application/json');
                                        return headers;
                                    },

});


export const apiSlice = createApi({
    baseQuery,
    tagTypes:['User','Blogs'],
    endpoints:(builder) => ({}),

});