import {useState, useEffect} from 'react'
import {useForm} from "react-hook-form"
import { Link , useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import Input from "../components/Input"
import { useLoginMutation } from '../slices/usersApiSlice'
import {setCredentials} from "../slices/authSlice";
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, {isLoading, error}] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);
      

    useEffect(() => {
      if (userInfo) {
        navigate('/blogs');
      }
    },[navigate, userInfo]);

    
    const {register,handleSubmit , formState: { errors },}= useForm()

    const onSubmit = async(data) =>{
        try {
          const  res = await login({ email: data.email, password: data.password}).unwrap();
          dispatch(setCredentials({...res}));
          navigate('/blogs');
        } catch (err) {
          toast.error( err?.data?.message || err.error);
          
        }
    }

    return(
        <div className="min-h-screen bg-[#1b1b1b] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input
              type="email"
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all ${errors.email ? 'border-red-500' : ''}`}
              placeholder="your@email.com"
              {...register('email', { 
                required: 'Email is required', 
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <Input
              type="password"
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all ${errors.password ? 'border-red-500' : ''}`}
              placeholder="••••••••"
              {...register('password', { 
                required: 'Password is required', 
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long'
                }
              })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          
         {isLoading && <Loader/>}
          {/* Submit Button */}
          <button type="submit" className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2.5 rounded-lg transition-colors">
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?  
          <Link to="/signup" className="text-gray-900 hover:text-gray-500 font-medium"> Sign up</Link>
        </div>
      </div>
    </div>
    )
}

export default Login