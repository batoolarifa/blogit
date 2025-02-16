import { useEffect} from "react"
import {useForm} from "react-hook-form"
import { useNavigate} from "react-router-dom"
import Input from "../components/Input"
import { useSelector, useDispatch } from "react-redux"
import {toast} from "react-toastify"
import Loader from "../components/Loader"
import { useRegisterMutation , useLoginMutation} from "../slices/usersApiSlice"
import { setCredentials } from "../slices/authSlice"




const Signup = () => {
    const {register, handleSubmit, formState: { errors },} = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const [registerUser, {isLoading }] = useRegisterMutation()
    const [login] = useLoginMutation();

    
    const {userInfo} = useSelector((state) => state.auth)

    useEffect(() => {
      if (userInfo) {
        navigate('/blogs');
        
      }
    },[navigate, userInfo]);
    const onSubmit = async(data) => {
      
      const formData = new FormData();
      
      Object.keys(data).forEach((key) => {
        
        if (key === 'profilePicture' || key === 'coverImage') {
          formData.append(key, data[key][0]); // file fields
        }
        else {
          formData.append(key, data[key]);
        }
      })
      
    try {
      const  res = await registerUser(formData).unwrap();
      dispatch(setCredentials({...res}))
      navigate('/profile'); 
      const loginRes = await login({ email: data.email, password: data.password}).unwrap();
      dispatch(setCredentials({...loginRes}))
      navigate('/blogs');
 
      
    } catch (err) {
      toast.error( err?.data?.message || err.error);
      
    }
  }

   
    return (
      <div className="max-w-4xl max-sm:max-w-lg mx-auto font-[sans-serif] p-6">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-5xl font-bold mb-2 text-[#bae15a]">Register</h2>
        <p className="text-gray-400 text-base">Sign up into your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {/* Full Name */}
        <div>
          <label className="text-[#bae15a] text-sm mb-2 block">Full Name</label>
          <Input
            type="text"
            className="bg-gray-600 w-full text-gray-200  text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all placeholder-gray-400"
            placeholder="Enter full name"
            {...register("fullName", { required: "Full Name is required" })}
          
            error={errors.fullName?.message}
          />
        </div>

        {/* Email */}
        <div className="mt-4">
          <label className=" text-[#bae15a] text-sm mb-2 block">Email</label>
          <Input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            className="bg-gray-600 w-full text-gray-200 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
            placeholder="Enter email"
            error={errors.email?.message}
          />
        </div>

        {/* Username */}
        <div className="mt-4">
          <label className = "text-[#bae15a] text-sm mb-2 block">Username</label>
          <Input
            type="text"
           {...register("username", { required: "Username is required" })}
            className="bg-gray-600 w-full text-gray-200 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
            placeholder="Enter username"
            error={errors.username?.message}
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className= "text-[#bae15a] text-sm mb-2 block">Password</label>
          <Input
            type ="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            className="bg-gray-600 w-full text-gray-200 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
            placeholder="Enter password"
            error={errors.password?.message}
          />
        </div>

        {/* Profile Picture */}
        <div className="mt-4">
          <label className="text-[#bae15a] text-sm mb-2 block">
            Profile Picture
          </label>
          <Input
            
            type="file"

            {...register("profilePicture", {
              required: "Profile Picture is required",
            })}
            className="block w-full text-sm text-white bg-gray-600 hover:bg-gray-700 focus:ring-4  font-medium rounded-lg cursor-pointer   focus:outline-none  file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0  file:bg-[#bae15a] file:text-black file:font-medium  file:hover:bg-[#a5c652]"

            error={errors.profilePicture?.message}
          />
        </div>

        {/* Cover Image */}
        <div className="mt-4">
          <label className="text-[#bae15a] text-sm mb-2 block">Cover Image</label>
          <Input
            
            type= "file"
            {...register("coverImage")}
            className="block w-full text-sm text-white bg-gray-600 hover:bg-gray-700 focus:ring-4  font-medium rounded-lg cursor-pointer   focus:outline-none  file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0  file:bg-[#bae15a] file:text-black file:font-medium  file:hover:bg-[#a5c652]"
            />
        </div>

         {/* About */}
         <div className="mt-4">
          <label className="text-[#bae15a] text-sm mb-2 block">About</label>
          <Input
            type="textarea"
            {...register("about", {
              required: "About is required",
            })}
            className="bg-gray-600 w-full text-gray-200 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
            placeholder="Tell us about yourself"
            error={errors.about?.message}
          />
        </div>

        {/* Tagline */}
        <div className="mt-4">
          <label className="text-[#bae15a] text-sm mb-2 block">Tagline</label>
          <Input
            type="text"
           {...register("tagline", { required: "Tagline is required" })}
            className="bg-gray-600 w-full text-gray-200 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
            placeholder="Enter your tagline"
            error={errors.tagline?.message}
          />
        </div>

               {/* Submit Button */}
          {isLoading && <Loader/>}
        <div className="mt-8">
          <button
            type="submit"
            className="mx-auto block py-3 px-6 text-sm tracking-wider rounded text-black-800  bg-[#AAFF00] hover:bg-[#BFF400] focus:outline-none">
            
            Submit
          </button>
        </div>
      </form>
    </div>
    )
}


export default Signup;