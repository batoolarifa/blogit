import { useParams } from "react-router-dom";
import { useGetBlogByIdQuery } from "../slices/blogsApiSlice";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom"; // Import NavLink
import DOMPurify from "dompurify"; 
import { useState, useEffect } from "react";
import DeleteBlog from "./DeleteBlog"
import { BsThreeDotsVertical } from "react-icons/bs";
import EditBlog from "./EditBlog";
import DisplayComments from "./Comment/DisplayComments"

const BlogDetail = () => {
    const { blogId } = useParams();
    const { data: blogData, isLoading  } = useGetBlogByIdQuery(blogId);
    const { userInfo } = useSelector((state) => state.auth);

  

   
    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    

    if (isLoading) return <Loader />;
    if (!blogData) return <div className="text-white text-3xl">Blog not found</div>;

    
    const isAuthor = userInfo?.data?.user?._id === blogData?.data?.blogAuthor._id

    const handleDeleteClick = () => {
        setShowDelete(true); 
        setMenuOpen(false);
    }

    const handleEditClick = () => {
        setShowEdit(true); 
        setMenuOpen(false);
    }

 



    return (
        <>
        
        <div className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-200 antialiased">
            <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
                <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">

                {isAuthor && (
                        <div className="absolute right-4">
                            <button 
                                onClick={() => setMenuOpen(!menuOpen)} 
                                className="p-2 text-black hover:bg-gray-200 rounded-full"
                            >
                                <BsThreeDotsVertical size={24}  />
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-lg">
                                    <button 
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                        onClick={handleEditClick}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                        onClick={handleDeleteClick} // Show delete modal and close menu
                                    >
                                        Delete
                                    </button>

                                
                                </div>
                            )}
                        </div>
                    )}

                     { showEdit && (
                 <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 h-screen overflow-y-scroll">
                <div className="bg-white w-full">
                   <EditBlog 
                  blogId={blogId}  // Pass the blogId so the component can use it in its payload
                   onClose={() => setShowEdit(false)}  // Provide an onClose callback to hide the edit form
                />
                </div>
              </div>
               )}

                            { showDelete && (
                                <DeleteBlog onClose={() => setShowDelete(false)} blogId={blogId} />
                          )
                            }
                    <header className="mb-4 lg:mb-6 not-format">
                        <address className="flex items-center mb-6 not-italic">
                            <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                <img
                                    className="mr-4 w-16 h-16 rounded-full"
                                    src={blogData?.data?.blogAuthor?.profilePicture}
                                    alt={blogData?.data?.blogAuthor?.profilePicture}
                                />
                                <div>
                                    <NavLink
                                        to={`/profile/${blogData?.data?.blogAuthor._id}`} // Navigate to author's profile
                                        className="text-xl font-bold text-gray-900 dark:text-white"
                                    >
                                        {blogData?.blogAuthor}
                                    </NavLink>
                                    <p className="text-base text-gray-800">
                                        {blogData?.data?.blogAuthor.tagline}
                                    </p>
                                    <p className="text-base text-gray-800 ">
                                        <time dateTime={blogData.date} title={blogData.date}>
                                        {new Date(blogData?.data?.createdAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}

                                        </time>
                                    </p>
                                </div>
                            </div>
                        </address>

                        

                        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl">
                            {blogData.data.title}
                        </h1>
                    </header>

                    {/* Display Blog Content with HTML Formatting */}
                    <div
                        className="prose lg:prose-xl"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(blogData.data.content), // Sanitize HTML for security
                        }}
                    />

                    {blogData.data.blogImage && (
                        <figure>
                            <img
                            className="mt-4 object-cover "
                            src={blogData.data.blogImage} alt="Blog" />
                        </figure>
                    )}


                    
                    {blogData.data.hashtags && blogData.data.hashtags.length > 0 && (
                        <div className="mt-4">
                            <p className="text-base text-gray-800"></p>
                            <div className="flex flex-wrap gap-2">
                                {blogData.data.hashtags.map((hashtag, index) => (
                                    <NavLink
                                        key={index}
                                        to={`/hashtag/${hashtag.replace("#", "")}`} // Navigate to hashtag page
                                        className="text-sm font-medium text-black-600 hover:text-blue-800"
                                    >
                                        {hashtag}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    )}

                    
                       
                </article>
             </div>
        </div>
        <DisplayComments blogId={blogId} currentUser={userInfo?.data?.user} />
        </>
        
    );
};

export default BlogDetail;


