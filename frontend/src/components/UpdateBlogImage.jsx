import React,{ useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useUpdateUserBlogImageMutation } from "../slices/blogsApiSlice"

import Loader from './Loader'
import {toast} from "react-toastify"
import { updateBlog } from '../slices/blogSlice'


function UpdateBlogImage({blogId}) {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);
    const [previewImage, setImagePreview] = useState(null);

    const [updateBlogImage] = useUpdateUserBlogImageMutation()
    const handleFileChange = async(e) => {
      

        const file = e.target.files[0];
        if (file) {

          const imageUrl = URL.createObjectURL(file);
          setImagePreview(imageUrl);
          
          try {
            const formData = new FormData();
            formData.append('blogImage', file);
            
            setIsLoading(true);
            
            const res = await updateBlogImage({blogId, data: formData }).unwrap();
            toast.success(res.message);
            
           dispatch(updateBlog({...res}))
            
            
            
          } catch (error) {
            toast.error("Failed to update the cover image.",error);
          } finally {
            setIsLoading(false);
          }
          
        }
      };
   
    return (
        <>  
        
            <div className="flex justify-start mb-4">
        <label htmlFor="blog-image-upload" className="cursor-pointer">
          <span className="inline-flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 transition-all">
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </span>
          <input
            id="blog-image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
       {/* Show preview of the selected image */}
       {previewImage && (
                <div className="mb-4">
                    <p className="text-sm text-gray-300">Selected Image</p>
                    <img
                        src={previewImage}
                        alt="Selected Preview"
                        className="w-full max-w-[600px] h-auto mx-auto rounded-lg shadow-md"
                    />
                </div>
            )}


</>

    )
}

export default UpdateBlogImage;



