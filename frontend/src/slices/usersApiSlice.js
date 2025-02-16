import {apiSlice} from "./apiSlice";
const USERS_URL = '/api/v1/users';


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url:`${USERS_URL}/login`,
                method: 'POST',
                body: data
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data
            })
        }),
        getCurrentUser: builder.query({
            query: () => ({
                url: `${USERS_URL}/current-user`,
                method: 'GET',
            })
        }),
        updateAccountDetails: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/update-account`,
                method: 'PATCH',
                body: data
            })
        }),
        updateUserProfilePicture: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/update-profile-pic`,
                method: 'PATCH',
                body: data
            })

        }),
        updateUserCoverImage: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/cover-image`,
                method: 'PATCH',
                body: data
            })
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/change-password`,
                method: 'POST',
                body: data
            })
        }),
        getFollowerProfile: builder.query({
            query: (username) => ({
                url: `${USERS_URL}/f/${username}`,
                method: 'GET',
            }),
        }),

        getBlogHistory: builder.query({
            query: () => ({
                url: `${USERS_URL}/blog-history`,
                method: 'GET',
            }),
        }),
    }),
    
});

export const {useLoginMutation,
             useLogoutMutation, 
             useRegisterMutation, 
             useUpdateAccountDetailsMutation, 
             useUpdateUserProfilePictureMutation,
              useUpdateUserCoverImageMutation,
            useChangePasswordMutation } = usersApiSlice

export const {useGetCurrentUserQuery, useGetFollowerProfileQuery , useGetBlogHistoryQuery} = usersApiSlice