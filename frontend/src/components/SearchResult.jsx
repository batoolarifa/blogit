import { useState, useEffect } from "react";
import { useLocation, useSearchParams, NavLink } from "react-router-dom";
import { useGetAllBlogsQuery } from "../slices/blogsApiSlice";
import PaginateGetPosts from "./Posts/PaginateGetPosts";
import {useNavigate} from "react-router-dom"

const SearchResult = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams(location.search);
  const navigate = useNavigate();
 
  const search = searchParams.get("search") || "";
  const pageFromUrl = parseInt(searchParams.get("page"))  || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  const hashtags = search.includes("#")
    ? search.split(" ").filter((tag) => tag.startsWith("#")).join(",")
    : [];


  const { data, isLoading } = useGetAllBlogsQuery({
      page: currentPage  || 1,
      limit: 4,
      search,
      hashtags,
      sortBy: "title",
      sortType: "asc",
    });
  
  const blogs = data?.data?.blogs || [];
  const totalPages = data?.data?.pagination?.totalPages || 1; 

  
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      searchParams.set("page", page);
      navigate(`?${searchParams.toString()}`, {replace: true});
    }
  };

  return (
    <PaginateGetPosts
     pageFromUrl={pageFromUrl} 
     totalPages={totalPages} 
     blogs={blogs} 
     handlePageChange={handlePageChange}
     isLoading={isLoading}
     >
<h1 className="mt-10 mb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">Let's   <mark className="px-2 text-black bg-[#bae51a] rounded-sm ">Explore</mark> Your Thoughts</h1>

     </PaginateGetPosts>
     
  );
};

export default SearchResult;
