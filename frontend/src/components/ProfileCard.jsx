import React from "react";
import { useGetFollowerProfileQuery } from "../slices/usersApiSlice";
import Loader from "./Loader";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileCard = ({ username}) => {
  const {userInfo} = useSelector(state => state.auth)
  const userInfoUsername = userInfo?.data?.user?.username 
  const { data: userStats, isLoading } = useGetFollowerProfileQuery(username || userInfoUsername);
  const navigate = useNavigate();
  
  const about = userStats?.data?.about

   

  if (isLoading) {
    return <div><Loader /></div>;
  }
  

  return (
    <>    <div className="mt-10  font-sans w-full flex justify-center items-center sm:py-4">
    <div className="card w-full sm:w-96 mx-auto bg-black shadow-xl hover:shadow p-4">
      <img
        className="w-32 h-32 mx-auto rounded-full -mt-16 border-8 border-white object-cover"
        src={userStats?.data?.profilePicture || ""}
        alt="Profile"
      />
      <div className="text-center mt-2 text-2xl font-medium text-gray-50">
        {userStats?.data?.fullName || "Full Name"}
      </div>
      <div className="text-center mt-2 font-light text-sm  text-[#bae51a]">
        @{userStats?.data?.username || "username"}
      </div>
      <div className="px-6 text-center mt-2 font-light text-sm  text-gray-50">
        <p>
          {userStats?.data?.tagline ||
            ""}
        </p>
      </div>

      <div className="flex justify-center mt-8 text-gray-50 text-sm ">
         <p>
          {userStats?.data?.about ||
            ""}
        </p>
   
        </div>
      <hr className="mt-6" />
      
      <div className="flex p-4">
        <div className="w-1/2 text-center  text-gray-200">
          <span className="font-bold  text-gray-200">{userStats?.data?.followersCount || "0"}</span> 
          
          <button
        className="ml-2  cursor-pointer"
        onClick={() => navigate(`/followers?userId=${userStats?.data?._id}`)}
      >
        Followers
      </button>
        </div>
        <div className="w-0 border border-gray-300 "></div>
        <div className="w-1/2 text-center  text-gray-200">
          <span className="font-bold  text-gray-200 ">{userStats?.data?.followedToCount || "0"}</span> 
          <button 
          className="ml-2  cursor-pointer"
          onClick={() => navigate(`/following?userId=${userStats?.data?._id}`)}
          >
            Following
          </button>

        </div>
      </div>
      
    </div>
  </div>

  
  </>


);
};

export default ProfileCard;
