import React,{useState, useEffect} from 'react'
import {useToggleFollowStatusMutation} from "../../slices/follwerRelationApiSlice";
import { toast } from 'react-toastify';
function Follow({userIdToFollow,  initialFollowStatus, refetch, isOwnProfile}) {
   
  const [toggleFollowStatus] = useToggleFollowStatusMutation()
  const [isFollowed, setIsFollowed] = React.useState( initialFollowStatus)
   
  useEffect(() => {
   setIsFollowed(initialFollowStatus);
 }, [initialFollowStatus]);
 
  const handleFollow = async() => {
   if (isOwnProfile)  return;
     try {
      
      const res = await toggleFollowStatus(userIdToFollow).unwrap();
        toast.success(res.message);
      
        setIsFollowed((prev) => !prev);
      

        
        refetch(); 
     } catch (error) {
      setIsFollowed((prev) => !prev);
      toast.error(error?.data?.message || error.error);
     }
  }
   
 

  return (
    <button 
    className="bg-[#bae51a] text-black px-9 py-2 rounded-md font-bold hover:opacity-80"
    onClick={handleFollow}
    >
              
        {isFollowed ? "Following" :"Follow"}  
            </button>
         
  )
}

export default Follow;
