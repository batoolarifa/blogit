import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu , AiOutlineUser, AiOutlineEdit, AiOutlineLogout, AiOutlineSearch  } from 'react-icons/ai';
import { TbBrandTinderFilled } from "react-icons/tb";
import { NavLink , useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {useLogoutMutation} from "../slices/usersApiSlice"
import { clearCredentials } from '../slices/authSlice';
import { IoSettingsOutline } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa";


import SearchBox from './SearchBox';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  
  
  const { userInfo } = useSelector((state) => state.auth);
  const profilePicture = userInfo?.data?.user?.profilePicture  || userInfo?.data?.profilePicture;

  

  useEffect(() => {
    if (userInfo) {
      navigate('/blogs');
      
    }
  },[navigate, userInfo]);

  

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  

  const handleLogout = async() => {
    try {
      
      const res = await logout().unwrap();
      
      dispatch(clearCredentials());
      navigate('/')
    } catch (err) {
      console.log(err);
      
    }
  };

  const handleNav = () => {
    setNav(!nav);
  };

  

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
      {/* Logo */}
      <h1 className="w-full text-3xl font-bold text-[#bae51a]">
        <TbBrandTinderFilled size={60} />
      </h1>
  
      {/* Navigation Links */}
      <ul className="hidden md:flex items-center">
        {/* Non-Logged-In Navigation Links */}
        {!userInfo && (
          <>
            <li className="p-4">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'text-[#bae51a]' : '')}
              >
                Home
              </NavLink>
            </li>
            <li className="p-4">
              <NavLink
                to="/blogs"
                className={({ isActive }) => (isActive ? 'text-[#bae51a]' : '')}
              >
                Blogs
              </NavLink>
            </li>
            <li className="p-4">
              <NavLink
                to="/signup"
                className={({ isActive }) => (isActive ? 'text-[#bae51a]' : '')}
              >
                Signup
              </NavLink>
            </li>
            <li className="p-4">
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? 'text-[#bae51a]' : '')}
              >
                Login
              </NavLink>
            </li>
          </>
        )}
  
        {/* Logged-In Navigation Links */}
        {userInfo && (
          <>
            
  
            {/* Search Bar and Icon */}
            <li >
               < SearchBox />
              </li>

           
            {/* Profile Section */}
            <li className="p-4">
              <div className="relative inline-block text-left">
                <button
                  className="w-8 h-auto rounded-full mt-2 text-white"
                  onClick={toggleDropdown}
                >
                  <img
                    src={profilePicture || 'unknown'}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </button>
  
                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                    <div className="flex flex-col">
                      <NavLink
                        to="/profile"
                        className="py-2 px-4 text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <AiOutlineUser className="mr-2" />
                        Profile
                      </NavLink>
                      <NavLink
                        to="/blogs"
                        className="py-2 px-4 text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <FaBookOpen className="mr-2" />

                        Blogs
                      </NavLink>
                      <NavLink
                        to="/publish"
                        className="py-2 px-4 text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <AiOutlineEdit className="mr-2" />
                        Write Blog
                      </NavLink>
                      <NavLink
                        to="/setting"
                        className="py-2 px-4 text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <IoSettingsOutline  className='mr-2'/>

                        Setting
                      </NavLink>
                      
                      <button
                        onClick={handleLogout}
                        className="py-2 px-4 text-red-600 hover:bg-gray-100 flex items-center"
                      >
                        <AiOutlineLogout className="mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </li>
          </>
        )}
      </ul>
  
      {/* Mobile Menu Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
  
      {/* Mobile Navigation */}
      <ul
        className={
          nav
            ? 'absolute left-0 top-0 w-[60%] h-full border-r border-r-gray-200 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out duration-500 fixed left-[-100%]'
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#bae51a] m-4">
          <TbBrandTinderFilled size={40} />
        </h1>
  
        {/* Mobile Links */}
        {!userInfo && (
          <>
            <li className="p-4 border-b border-gray-600">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'text-[#bae51a]' : '')}
              >
                Home
              </NavLink>
            </li>
            <li className="p-4 border-b border-gray-600">
              <NavLink
                to="/blogs"
                className={({ isActive }) => (isActive ? 'text-[#bae51a]' : '')}
              >
                Blogs
              </NavLink>
            </li>
            <li className="p-4 border-b border-gray-600">
              <NavLink
                to="/signup"
                className={({ isActive }) => (isActive ? 'text-[#bae51a]' : '')}
              >
                Signup
              </NavLink>
            </li>
            <li className="p-4 border-b border-gray-600">
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? 'text-[#bae51a]' : '')}
              >
                Login
              </NavLink>
            </li>

          </>
        )}
        {userInfo && (
          <>
            <li >
               < SearchBox />
              </li>

          
          <div className=" flex flex-col p-4   border-gray-600 items-start">
            <NavLink
              to="/profile"
              className="py-2 px-4 text-gray-200 border-b w-full hover:bg-[#bae51a] hover:text-black"
            >
              
              My Profile
            </NavLink>
            <NavLink
              to="/blogs"
              className="py-2 px-4  text-gray-200 border-b w-full hover:bg-[#bae51a] hover:text-black"
            >
              Blogs
              
            </NavLink>

            <NavLink
              to="/publish"
              className="py-2 px-4  text-gray-200 border-b w-full hover:bg-[#bae51a] hover:text-black"
            >
              Write Blog
              
            </NavLink>
            <NavLink
              to="/setting"
              className="py-2 px-4  text-gray-200 border-b w-full hover:bg-[#bae51a] hover:text-black"
              >
                Setting
                </NavLink>
                     

            <button
              onClick={handleLogout}
                  className="py-2 px-4 text-gray-200 border-b  hover:bg-[#bae51a] hover:text-black block w-full text-left"

                  >
                 
              Logout
            </button>
          

          </div>
          </>
        )}
      </ul>
    </div>
  );
            
   };

export default Navbar;
