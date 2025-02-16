import { useState, useEffect } from "react";
import Loader from "../Loader";
import DOMPurify from "dompurify";
import {NavLink} from "react-router-dom";




const PaginateGetPosts = ({children , pageFromUrl,totalPages,blogs, handlePageChange, isLoading}) => {
  const [currentPage, setCurrentPage] = useState(pageFromUrl);



  useEffect(() => {
    setCurrentPage(pageFromUrl)
  },[pageFromUrl])

  if (isLoading) {
    return <Loader />;
  }

  
  return (
    <div className="px-2 py-2 bg-gray-100">
      <div className="container mx-auto">
        <div className="w-full lg:w-8/12 mx-auto">
         {children}
          <div className="mt-6">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog._id} className="max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md mb-6">
                  <div className="flex items-center justify-between">
                    <span className="font-light text-gray-600">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                    </span>
                  </div>
                  <div className="mt-2">
                    <NavLink to={`/blog/${blog._id}`} className="text-2xl font-bold text-gray-700 hover:underline">
                      {blog.title}
                    </NavLink>
                    <div
                      className="prose lg:prose-xl"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(blog.content.substring(0, 200)) + "...",
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <NavLink
                      to={`/blog/${blog._id}`}
                      className="bg-[#bae51a] text-black font-bold py-2 px-4 rounded-lg shadow-md hover:bg-[#020202] hover:text-white transition-all duration-200 ease-in-out"
                    >
                      Read more
                    </NavLink>
                    <div>
                      <NavLink to={`/${blog.blogAuthor.username}`} className="flex items-center">
                        <img
                          src={blog.blogAuthor.profilePicture}
                          alt="profile"
                          className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
                        />
                        <h1 className="font-bold text-gray-700 hover:underline">
                          {blog.blogAuthor.fullName}
                        </h1>
                        
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No blogs found</p>
            )}
          </div>


          {/* Pagination Buttons */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 rounded-md text-gray-700 ${
                    page === currentPage
                      ? "bg-black text-white"
                      : "bg-white hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    
  );
};

export default PaginateGetPosts;
