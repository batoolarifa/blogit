import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    blogs:[]
    
}

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers:{
        setBlogs: (state, action) => {
            state.blogs = action.payload
        },
        addBlog: (state, action) => {
            state.blogs.push(action.payload)
        },
        deleteBlog: (state, action) => {
            state.blogs = state.blogs.filter((blog) => blog._id !== action.payload)
        },
        updateBlog: (state, action) => {
            state.blogs = state.blogs.map((blog) => blog._id === action.payload._id ? action.payload : blog)
        }

    }
    
});




export const { setBlogs, addBlog , deleteBlog , updateBlog } = blogSlice.actions;

export default blogSlice.reducer;

