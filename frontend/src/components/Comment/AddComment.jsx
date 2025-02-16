import { useAddCommentMutation } from "../../slices/commentsApiSlice";
import {toast} from "react-toastify";
import { useState } from "react";
import DisplayComments from "./DisplayComments";
const AddComment = ({blogId, refetch}) => {
    const [addComment, { isLoading }] = useAddCommentMutation();
     const [content, setContent] = useState("");


    

    const handleSubmit = async (e) => {
       
        e.preventDefault();
        
        if (!content.trim()) return;
        try {
            await addComment({ blogId, data: {content} } ).unwrap();
            toast.success("Comment added successfully!");
            
            refetch();
            setContent("");
            
            
        } catch (error) {
            toast.error(error?.data?.message || error.error);
            
        }
    }

    return (
        
  <div className="  max-w-2xl mx-auto px-12">
      <div className="flex justify-between items-center mb-6">
        
    </div>
        <form onSubmit={handleSubmit} className="mb-6">
                <div className="py-2 px-4 mb-4 bg-gray-100 rounded-lg rounded-t-lg border  border-gray-700">
            <label htmlFor="comment" className="sr-only">Your comment</label>
            <textarea id="comment" rows="6"
                className="px-0 w-full text-sm text-black border-0 focus:ring-0 focus:outline-none placeholder-gray-500 bg-gray-100"
                placeholder="Write a comment..." required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              
                
                ></textarea>
        </div>

       
       
       
        
        <button type="submit"
         className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-[#bae51a]  rounded-md my-6 mx-auto  text-black hover:bg-[#d5ff3f] mt-0" 
        disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>    

    
      </div>

    );
};

export default AddComment;