import React, { useState } from "react";
import { usePublishBlogMutation } from "../slices/blogsApiSlice";
import QuillEditor from "../components/QuillEditor";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addBlog } from "../slices/blogSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

const AddBlog = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [publishBlog] = usePublishBlogMutation();

  const title = watch("title");
  const content = watch("content");
  const tags = watch("tags");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Preview the image
  };

  
  const onSubmit = async (data) => {
    console.log("Inside onSubmit:", data);
  
    const sanitizedContent = DOMPurify.sanitize(data.content);
  
    
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", sanitizedContent);
    formData.append("hashtags", data.tags);
    formData.append("blogImage", image);
  
    try {
      const response = await publishBlog(formData).unwrap(); 
      
      dispatch(addBlog({...response}));
     
      toast.success("Blog published succ");
      navigate("/blogs");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  

  return (
    
    <div className=" w-full max-w-full mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
        <div className="w-full text-center mb-4"> 
      <h1 className="text-gray-800 font-bold mb-4 text-2xl sm:text-5xl  text-center">Write Your Story</h1>
      </div>
      <div className="flex justify-center w-full sm:w-auto">  

      <button
        className="bg-[#bae51a] text-black hover:bg-[#d5ff3f] font-bold py-2 px-3 sm:px-4 md:px-5 lg:px-2 lg:py-2 rounded-full shadow-lg transition-all duration-200 ease-in-out w-auto min-w-[120px] max-w-[140px] text-sm md:text-base"


     onClick={handleSubmit(onSubmit)}
  
      >
        Publish Blog
      </button>
     
      </div>

    </div>
      {/* Image Upload Button */}
      <div className="flex justify-start mb-4">
        <label htmlFor="image-upload" className="cursor-pointer">
          <span className="inline-flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 transition-all">
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </span>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>
     
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-4">
          <img src={imagePreview} alt="Preview" className="w-md h-[500px] object-cover rounded-md shadow-md block mx-auto mb-9 " />
        </div>
      )}
     
     
     <label
      className="block text-gray-700 text-sm font-bold"
      >Title</label>

      <Input
        type="text"
        placeholder="Title..."
        {...register("title", { required: true })}
        className="w-full p-3 bg-white text-black rounded-md  border border-gray-900 focus:outline-none focus:ring-2  focus:ring-[#bae51a] mb-6"


  />
      <label
      className="block text-gray-700 text-sm font-bold mb-1"
      >Content</label>

      {/* Quill Editor for Content */}
      <div className="w-full  max-w-10xl mx-auto bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-300 ">

      <QuillEditor content={content} setContent={(content) => setValue("content", content)} />
      </div>
    
      <label
      className="block text-gray-700 text-sm font-bold mt-5"
      >Hashtags</label>


      <Input
        type="text"
        placeholder="Tags (comma-separated)"
        {...register("tags")}
        className="w-full p-3 bg-white text-black rounded-md border border-gray-900 focus:outline-none focus:ring-2  focus:ring-[#bae51a] "     
         />


        
        
        

    </div>
  );
};

export default AddBlog;
