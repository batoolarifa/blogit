import React, { useState } from "react";
import { useGetFollowerProfileQuery } from "../slices/usersApiSlice";
import { useGetAllBlogsQuery } from "../slices/blogsApiSlice";
import { useSearchParams } from "react-router-dom";
import About from "./About";
import PaginateGetPosts from "./Posts/PaginateGetPosts";
import { useNavigate } from "react-router-dom";
import Follow from "./FollowRelation/Follow";

import { useSelector } from "react-redux";


const UserProfile = ({ username }) => {
  const { data: userStats, isLoading , refetch} = useGetFollowerProfileQuery(username);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const about = userStats?.data?.about;
  const authorId = userStats?.data?._id;

  const {userInfo} = useSelector(state => state.auth)
  
  const isOwnProfile = userInfo?.data?.user?._id === authorId   || userInfo?.data?._id === authorId;


  
  const [currentPage, setCurrentPage] = useState(1);
  
  const isFollowed = userStats?.data?.isFollowed;


  const { data: blogData, isLoading: isLoadingBlogs } = useGetAllBlogsQuery(
    { authorId,
      page: currentPage,
      limit: 2,
      sortBy: "createdAt",
      sortType: "desc",
      
    },
    
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      searchParams.set("page", page);
      navigate(`?${searchParams.toString()}`, {replace: true});
    }
  };


  

  const posts = blogData?.data?.blogs || [];
  const totalPages = blogData?.data?.pagination?.totalPages || 1;

  return (
    <>
      <div className="mt-7 font-sans w-full flex justify-center items-center sm:py-4">
        <div className="card w-full sm:w-96 mx-auto bg-black shadow-xl hover:shadow p-4">
          <img
            className="w-32 h-32 mx-auto rounded-full -mt-16 border-8 border-white object-cover"
            src={userStats?.data?.profilePicture || ""}
            alt="Profile"
          />
          <div className="text-center mt-2 text-2xl font-medium text-gray-50">
            {userStats?.data?.fullName || "Full Name"}
          </div>
          <div className="text-center mt-2 font-light text-sm text-gray-200">
            @{userStats?.data?.username || "username"}
          </div>
          <div className="px-6 text-center mt-2 font-light text-sm text-gray-200">
            <p>
              {userStats?.data?.tagline ||
                ""}
            </p>
          </div>
          <div className="flex justify-center mt-4">
           <Follow userIdToFollow={authorId}
                   initialFollowStatus = {isFollowed}
                   refetch={refetch}
                   isOwnProfile={isOwnProfile}
                     
                     />    
          
          </div>
          <hr className="mt-6" />
          <div className="flex p-4">
            <div className="w-1/2 text-center text-gray-200">
              <span className="font-bold text-gray-200">{userStats?.data?.followersCount || "0"}</span> 
              <button
        className="ml-2  cursor-pointer"
        onClick={() => navigate(`/followers?userId=${authorId}`)}
      >
        Followers
      </button>
            </div>
            <div className="w-0 border border-gray-300"></div>
            <div className="w-1/2 text-center text-gray-200">
              <span className="font-bold text-gray-200">{userStats?.data?.followedToCount || "0"}</span>
              <button
           className="ml-2  cursor-pointer"
          onClick={() => navigate(`/following?userId=${authorId}`)}
           >
        Following
      </button>
         
              
               
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <About about={about} />
      </div>

      
      {posts.length > 0 && (
        <div className="px-2 py-2 bg-black mt-5">
      
        <PaginateGetPosts
        pageFromUrl={currentPage}
        totalPages={totalPages}
        blogs={posts}
        isLoading={isLoadingBlogs}
        handlePageChange={handlePageChange}
        >
        <h1 className="mt-10 mb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">Recent <mark className="px-2 text-black bg-[#bae51a] rounded-sm ">Blogs</mark></h1>
    
        </PaginateGetPosts>
      </div>
    )}
    
    </>
  );
};

export default UserProfile;


 


