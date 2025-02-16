import React,{ useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useUpdateUserProfilePictureMutation } from "../slices/usersApiSlice"
import {setCredentials} from "../slices/authSlice"
import Loader from './Loader'
import {toast} from "react-toastify"

const UserAvatar = () =>  {
    const {userInfo} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);

    const [updateProfilePicture] = useUpdateUserProfilePictureMutation()
    const handleFileChangeOnAvatar = async(e) => {
      
        const file = e.target.files[0];
        if (file) {
          
          try {
            const formData = new FormData();
            formData.append('profilePicture', file);
            
            setIsLoading(true);
            
            const res = await updateProfilePicture(formData).unwrap();
         
            toast.success(res.message);
            dispatch(setCredentials({...res}))
           } catch (error) {
            toast.error("Failed to update the profile picture",error);
          } finally {
            setIsLoading(false);
          }
          
        }
      };
   
  return (
    <>
      <h2 className=" mt-9 text-lg font-semibold mb-4">User Avatar</h2>
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
        
       <img
          src={userInfo?.data?.user?.profilePicture  || userInfo?.data?.profilePicture}
          alt="User Avatar"
          className="w-48 h-48 rounded-full border-4 border-[#d1e51a]"
        />
        <div className="w-full flex justify-center sm:justify-start">

        <label 
        htmlFor="avatar-file-upload" 
        className=" bg-gray-900 text-white px-3 py-2 sm:px-4 md:px-5 lg:px-2 lg:py-2  font-medium rounded hover:bg-gray-700 cursor-pointerw-auto min-w-[120px] max-w-[140px] text-sm md:text-base">
                

                 
            Change Avatar
            </label>
            </div>

            <input 
            id="avatar-file-upload" 
            type="file" 
            className="hidden" 
            onChange={(e) => handleFileChangeOnAvatar(e)} 
            />
           
           
            {isLoading &&( 
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-10">
                <Loader />
            </div>
        )}
       
     </div>
      </>
    

  )
}

export default UserAvatar;
