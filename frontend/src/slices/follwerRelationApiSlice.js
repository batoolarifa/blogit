import {apiSlice} from "./apiSlice";

const FOLLOWERSHIP_URL = '/api/v1/followership';


export const followerRelationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFollowers: builder.query({
            query: (userId) => ({
                url: `${FOLLOWERSHIP_URL}/followers/${userId}`,
                method: 'GET',
                
            })
        }),
        getFollowings: builder.query({
            query: (userId) => ({
                url: `${FOLLOWERSHIP_URL}/following/${userId}`,
                method: 'GET',
                
            })
        }),
        toggleFollowStatus: builder.mutation({
            query: (userIdToFollow) => ({
                url: `${FOLLOWERSHIP_URL}/f/${userIdToFollow}`,
                method: 'POST',
                
            })
        }),

             
        
    })
})


export const {  useGetFollowersQuery, useGetFollowingsQuery } = followerRelationApiSlice


export const {
    useToggleFollowStatusMutation} = followerRelationApiSlice

