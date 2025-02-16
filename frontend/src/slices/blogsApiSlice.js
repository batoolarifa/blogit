import {apiSlice} from "./apiSlice";

const BLOGS_URL = '/api/v1/blogs';


export const blogsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        publishBlog: builder.mutation({
            query: (data) => ({
                url: `${BLOGS_URL}/publish`,
                method: 'POST',
                body: data
            })
        }),
        getBlogById: builder.query({
            query: (blogId) => ({
                url: `${BLOGS_URL}/${blogId}`,
                method: 'GET',
            })
        }),
        deleteUserBlog: builder.mutation({
            query: (blogId) => ({
                url: `${BLOGS_URL}/${blogId}`,
                method: 'DELETE',
            })
        }),
        updateUserBlog: builder.mutation({
            query: ({blogId, data}) => ({
                url: `${BLOGS_URL}/${blogId}`,
                method: 'PATCH',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: data
            })
        }),
        
        updateUserBlogImage: builder.mutation({
            query: ({blogId,data}) => ({
                url: `${BLOGS_URL}/update-image/${blogId}`,
                method: 'PATCH',
                body: data
            })
        }),

        togglePublishStatus: builder.mutation({
            query: (blogId) => ({
                url: `${BLOGS_URL}/toggle/${blogId}`,
                method: 'PATCH',
            })
        }),
        getAllBlogs:builder.query({
            query: ({page=1, limit= 4, search = "", sortBy = "title", sortType= "asc", hashtags = "", authorId= ""}) => ({
               url:`${BLOGS_URL}`,
               method: 'GET',
               params: { page, limit, search, sortBy, sortType, hashtags, authorId },

            }),
            
        }),
        
        
    })
})

export const { 
    usePublishBlogMutation , 
    useDeleteUserBlogMutation, 
    useUpdateUserBlogMutation,
    useUpdateUserBlogImageMutation,
    useTogglePublishStatusMutation

                             } = blogsApiSlice
export const {useGetBlogByIdQuery, useGetAllBlogsQuery} = blogsApiSlice