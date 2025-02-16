import React,{ useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useUpdateUserCoverImageMutation } from "../slices/usersApiSlice"
import {setCredentials} from "../slices/authSlice"
import Loader from './Loader'
import {toast} from "react-toastify"

const CoverImage = () => {
    const {userInfo} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);

    const [updateCoverImage] = useUpdateUserCoverImageMutation()
    const handleFileChange = async(e) => {
      

        const file = e.target.files[0];
        if (file) {
          
          try {
            const formData = new FormData();
            formData.append('coverImage', file);
            
            setIsLoading(true);
            
            const res = await updateCoverImage(formData).unwrap();
            toast.success(res.message);
            
           dispatch(setCredentials({...res}))
            
            
            
          } catch (error) {
            toast.error("Failed to update the cover image.",error);
          } finally {
            setIsLoading(false);
          }
          
        }
      };
   
  return (
    <>
      <h2 className="mt-6 text-xl font-medium mb-4 text-gray-800">Update Cover Image</h2>

      <div className="relative">
        
      {userInfo?.data?.user?.coverImage  || userInfo?.data?.coverImage ? (
          <img
            src={userInfo?.data?.user?.coverImage  || userInfo?.data.coverImage}
            alt="Cover Image"
            className="w-full h-full object-cover rounded-lg"
            />
        ) : 
        (
            <div className="w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">
                 <p className="text-sm">No cover image uploaded</p>
               </div>
        ) 
        }
              
        <div className="flex justify-center mt-4">
          <label htmlFor="cover-file-upload" className="mt-4  bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded font-medium">
            Change Cover
            </label>
            <input 
            id="cover-file-upload" 
            type="file" 
            className="hidden" 
            onChange={(e) => handleFileChange(e)} 
            />
          </div>
            {isLoading &&( 
                <div className="mt-6 absolute top-0 left-0 w-full h-full flex justify-center items-center z-10">
                <Loader />
            </div>
        )}
       
     </div>
      </>
    

  )
}

export default CoverImage;
