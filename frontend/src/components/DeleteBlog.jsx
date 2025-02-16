import React from 'react'
import {useDeleteUserBlogMutation} from "../slices/blogsApiSlice"
import { deleteBlog as deleteBlogAction } from '../slices/blogSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Loader from './Loader'

function DeleteBlog({blogId , onClose}) {
    const [deleteBlog , {isLoading}] = useDeleteUserBlogMutation(blogId)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    

    
    const handleDeleteBlog = async () => {
        try {
            await deleteBlog(blogId).unwrap();
            dispatch(deleteBlogAction(blogId));
            toast.success("Blog deleted successfully!");
            onClose();
            navigate('/blogs');
        } catch (error) {
            console.error("Delete blog error:", error);
            toast.error("Failed to delete blog");
        }
    }
    return (
    
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-red-600">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to permanently delete this blog?</p>
            <div className="flex justify-end space-x-4">
                <button 
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    disabled={isLoading}
                >
                    Cancel
                </button>
                <button 
                    onClick={handleDeleteBlog}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    disabled={isLoading}
                >
                    {isLoading ? "Deleting..." : 'Delete'}
                </button>
            </div>
        </div>
    </div>
    )
}

export default DeleteBlog;

