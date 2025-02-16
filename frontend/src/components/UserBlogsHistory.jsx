import {useState, useEffect} from "react";
import {useGetBlogHistoryQuery} from "../slices/usersApiSlice"

import GetPosts from "./Posts/GetPosts";
import ProfileCard from "./ProfileCard";




const UserBlogHistory = () => {
  const {data: BlogHistory , isLoading, refetch} = useGetBlogHistoryQuery(undefined,{
    refetchOnMountOrArgChange: true, // Ensure it refetches on user change
    refetchOnWindowFocus: true, // Also refetch when user switches back to tab
    staleTime: 0,
    
  }
  )
  const [visiblePosts, setVisiblePosts] = useState(3);

  

  const posts = BlogHistory?.data  || [];
  const username = BlogHistory?.data[0]?.blogAuthor?.username
  

  
  const id = BlogHistory?.data[0]?.blogAuthor?._id

  
  useEffect(() => {
    refetch();
  }, [username]);

  return (
    <>
    
       <div className="px-2 py-2 bg-gray-50 mt-5">
        <ProfileCard  key={id} username={username}/>
            <GetPosts posts={posts} 
    isLoading={isLoading} 
    visiblePosts={visiblePosts} 
    setVisiblePosts={setVisiblePosts}
    buttonStyle={{bgColor: "bg-[#bae51a]", textColor: "text-black"}}
    buttonClass = "font-medium hover:bg-[#d5ff3f]"
    />
    </div>
    
    
    
    
 
</>
);

}

export default UserBlogHistory;