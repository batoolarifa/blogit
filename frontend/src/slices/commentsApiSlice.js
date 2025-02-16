import {apiSlice} from "./apiSlice";

const COMMENTS_URL = '/api/v1/comments';


export const commentsApiSlice = apiSlice.injectEndpoints({ 
    endpoints: (builder) => ({
        addComment: builder.mutation({
            query: ({blogId, data}) => ({
                url: `${COMMENTS_URL}/${blogId}`,
                method: 'POST',
                body: data
            })
        }),
        updateComment: builder.mutation({
            query: ({commentId, data}) => ({
                url: `${COMMENTS_URL}/c/${commentId}`,
                method: 'PATCH',
                body: data
            })
        }),

        deleteComment: builder.mutation({
            query: (commentId) => ({
                url: `${COMMENTS_URL}/c/${commentId}`,
                method: 'DELETE',
            })
        }),
        getAllComments: builder.query({
            query: (blogId) => ({
                url: `${COMMENTS_URL}/${blogId}`,
                method: 'GET',
            })
        }),

    })


})


export const {useAddCommentMutation, useUpdateCommentMutation, useDeleteCommentMutation,
     useGetAllCommentsQuery } = commentsApiSlice