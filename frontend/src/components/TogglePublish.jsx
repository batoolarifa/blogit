import React,{useState, useEffect} from 'react'
import { useTogglePublishStatusMutation } from '../slices/blogsApiSlice'
import { updateBlog } from '../slices/blogSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
function TogglePublish({blogId, initialStatus, refetch}) {

  
    const [isPublished, setIsPublished] = useState(initialStatus);

    const [togglePublishStatus] = useTogglePublishStatusMutation();
    const dispatch = useDispatch();


    useEffect(() => {
        setIsPublished(initialStatus);
    },[initialStatus])

    const togglePublish = async () => {
        try {
            const response = await togglePublishStatus(blogId);
            setIsPublished(response.data.isPublished);
            dispatch(updateBlog({...response}));
            toast.success("Blog status updated!");

            if (refetch) {
                refetch();
                
            }
            
            
        } catch (error) {
            console.log(error);
            
        }
        
    }
  return (
    <div>
      <div className="flex items-center space-x-3">
            <label className="relative inline-block w-12 h-6">
                <input 
                    type="checkbox" 
                    checked={isPublished} 
                    onChange={togglePublish} 
                    className="opacity-0 w-0 h-0" 
                />
                <span className="slider absolute top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition duration-300 ease-in-out"></span>
                <span className={`absolute top-0 left-0 w-6 h-6 bg-white rounded-full transition-transform duration-300 ease-in-out ${isPublished ? 'translate-x-6' : 'translate-x-0'}`}></span>
            </label>
            <span className={`text-sm font-medium ${isPublished ? 'text-yellow-500' : 'text-red-400'}`}>
                {isPublished ? 'Published' : 'Not Published'}
            </span>
        </div>
    </div>
  )
}

export default TogglePublish;
