import React from "react";
import { useNavigate } from "react-router-dom";

import {useState} from "react";
import {AiOutlineSearch} from "react-icons/ai"

const SearchBox = () => {
  
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();


  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page reload

    
    if (searchQuery.trim() !== "") {
        

        const params = new URLSearchParams(location.search);
        
        params.set("search", searchQuery)
        

        navigate(`/blogs?${params.toString()}`);

        setSearchQuery("");
    }
};

return (
  <div className="p-4  mt-3 w-full flex justify-center">  
  
      <form onSubmit={handleSearch} className="flex items-center">
      <input
          type="text"
          placeholder="Search blogs..."
          className="w-full border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#bae51a] overflow-hidden shadow-md 
             p-4 h-8 text-base 
             max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button 
       className="ml-2"
      type="submit"
      >
           <AiOutlineSearch size={20} className="text-white" />
             </button>
  </form>
  </div>

);
};

export default SearchBox;




