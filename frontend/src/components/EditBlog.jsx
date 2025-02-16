import React, { useEffect, useState } from "react";
import QuillEditor from "../components/QuillEditor";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate} from "react-router-dom";
import DOMPurify from "dompurify";
import { useGetBlogByIdQuery, useUpdateUserBlogMutation } from "../slices/blogsApiSlice";
import { updateBlog } from "../slices/blogSlice"
import Loader from "./Loader";
import UpdateBlogImage from "./UpdateBlogImage";
import TogglePublish from "./TogglePublish";

const EditBlog = ({blogId, onClose}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateBlogApi ] = useUpdateUserBlogMutation();
  const { data: blog, isLoading, refetch } = useGetBlogByIdQuery(blogId);




  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: blog
  });
  
  const content = watch("content");

  useEffect(() => {
    if (blog) {
        setValue("title", blog?.data?.title);
        setValue("content", blog?.data.content);
        setValue("hashtags", blog?.data.hashtags);
      
    }
  }, [blog, setValue]);
 
  

  
  const onSubmit = async (data) => {
    //console.log("Inside onSubmit:", data);
  
    const sanitizedContent = DOMPurify.sanitize(data.content);
  
    
    const detailsPayload = {
      
      title: data.title,
      content: sanitizedContent || "",
      hashtags: data.hashtags || [],
    };
  
    

    try {
      const response = await updateBlogApi({blogId, data: detailsPayload}).unwrap();
      dispatch(updateBlog(response));
      toast.success("Blog updated successfully!");

      refetch();

      if (onClose) {
        onClose();
        
      } else{
        navigate("/blogs");
      }
      
    } catch (error) {
      toast.error(error?.data?.message || error.error);
         }
  };
  
  if (isLoading) {
    return <Loader/>;
    
  }
  return (

    <div className="relative w-full max mx-auto bg-[rgb(27,27,27)] p-6 rounded-lg  shadow-lg max-h-screen overflow-auto">
       <div className="flex flex-wrap justify-between items-center mb-6 gap-2">

        <button
          className="bg-gray-600 text-white hover:bg-gray-500 font-bold py-2 px-4 md:py-3 md:px-5 rounded-full shadow-lg transition-all duration-200 ease-in-out mb-10"
          onClick={onClose}
    >
      ← Back to Blog
    </button>
    <div className="flex-grow text-center">

      <h1 className="text-[#bae51a] font-bold mb-4 text-4xl text-center">Edit Your Story</h1>
      </div>

      <button
        className="bg-[#bae51a] text-black    hover:bg-[#d5ff3f]   font-bold py-2 px-4 md:py-3 md:px-5 rounded-full shadow-lg transition-all duration-200 ease-in-out mt-5 mr-2 ml-auto "
        onClick={handleSubmit(onSubmit)}
  
      >
        Update Blog
      </button>
    </div>

    {blog?.data?.blogImage && (
        <div className="mb-4 mt-28 text-center">
          <p className="text-white font-semibold mb-2">Current Blog Image:</p>
          <img
            src={blog.data.blogImage}
            alt="Current Blog"
            className="w-full max-w-[600px] h-auto mx-auto rounded-lg shadow-md"
          />
        </div>
      )}
      
    <UpdateBlogImage blogId={blogId} />


    <div className="mb-10 mt-10">
    <TogglePublish blogId={blogId} initialStatus={blog?.data?.isPublished} refetch={refetch} />
    </div>


    <label
      className="block text-[#bae51a] text-sm font-bold mb-3"
      >Title</label>

      <Input
        type="text"
        placeholder="Title..."
        {...register("title", { required: true })}
        className="w-full p-3 bg-white text-black rounded-md  border border-gray-900 focus:outline-none focus:ring-2  focus:ring-[#bae51a] mb-6"


/>
      
      <label
      className="block text-[#bae51a] text-sm font-bold mb-2"
      >Content</label>

      
      
      {/* Quill Editor for Content */}
      <QuillEditor content={content} setContent={(content) => setValue("content", content)}
      
      />


      <label
      className="block text-[#bae51a] text-sm font-bold mt-3 mb-3"
      >Hashtags</label>


      {/* Tags Input */}
      <Input
        type="text"
        placeholder="Tags (comma-separated)"
        {...register("hashtags")}
        className="w-full p-3 bg-white text-black rounded-md  border border-gray-900 focus:outline-none focus:ring-2  focus:ring-[#bae51a] mb-6"

        />

     
    </div>
    
  );
};

export default EditBlog;
