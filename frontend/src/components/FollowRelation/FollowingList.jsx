import { useGetFollowingsQuery } from "../../slices/follwerRelationApiSlice";
import Loader from "../Loader";
import { useSearchParams ,  NavLink} from "react-router-dom";

import { useState } from "react";


const FollowerList = () => {
    
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("userId");

    
    const { data, isLoading } = useGetFollowingsQuery(userId);

    const followingList = data?.data  || [];
    
    const [visiblePosts, setVisiblePosts] = useState(3);


    const showMoreUsers = () => {
        setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 3);
    };
    
    if (isLoading) return <Loader />;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-16 bg-slate-200">
            <h1 className="my-10 text-3xl font-black sm:text-4xl">
                <span className="day inline-block"> Followings</span>
                <span className="night hidden">?</span>
            </h1>
            <div className="user-list w-full max-w-lg mx-auto bg-white rounded-xl shadow-xl flex flex-col py-4">
                {followingList?.slice(0, visiblePosts).map((user) => (
                    <div
                        key={user._id}
                       
                        className="user-row flex flex-col items-center justify-between cursor-pointer p-4 transition duration-300 sm:flex-row sm:py-4 sm:px-8 hover:bg-[#f6f8f9]"
                    > 
                        <div className="user flex items-center text-center flex-col sm:flex-row sm:text-left">
                            <div className="avatar-content mb-2.5 sm:mb-0 sm:mr-2.5">
                                <img
                                    className=" w-20 h-20 rounded-full"
                                    src={user?.following?.profilePicture || ""}
                                    alt={user?.following?.fullName || ""}
                                />
                            </div>
                            <div className="user-body flex flex-col mb-4 sm:mb-0 sm:mr-4">
                                <NavLink to={`/${user?.following?.username}`} className="title font-medium">
                                    {user?.following?.username}
                                </NavLink>
                                <div className="skills flex flex-col">
                                    
                                    <span className="subtitle text-slate-500">{user?.following?.tagline}</span>
                                </div>
                            </div>
                        </div>
                        <div className="user-option mx-auto sm:ml-auto sm:mr-0">
                           
                                                   </div>
                    </div>
                ))}
                
                {visiblePosts < followingList.length && (
                    <button
                        onClick={showMoreUsers}
                        className="show-more block w-10/12 mx-auto py-2.5 px-4 text-center rounded hover:bg-[#f6f8f9] font-medium transition duration-300"
                    >
                        Show more members
                    </button>
                )}
             </div>
        </div>
    );
};

export default FollowerList;
