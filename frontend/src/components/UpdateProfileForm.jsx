import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useGetCurrentUserQuery } from "../slices/usersApiSlice";
import { useUpdateAccountDetailsMutation } from "../slices/usersApiSlice";
import Input from "./Input";
import { setCredentials } from "../slices/authSlice";
import Loader from './Loader';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';



function UpdateProfileForm() {
  const { data: userData, isLoading, error, refetch } = useGetCurrentUserQuery();
  const [updateUserDetails, { isLoading: isUpdating }] = useUpdateAccountDetailsMutation();
  const dispatch = useDispatch();

  const { control, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: userData?.data  || {
      fullName: "",
      username: "",
      email: "",
      tagline: "",
      about: "",
      facebookUrl: "",
      githubUrl: "",
      linkedInUrl: "",
    }, 
  });


  const [isInitialLoad, setIsInitialLoad] = useState(true); 
  const watchedFields = watch(); 


  const onSubmit = async (data) => {
    try {
      
      const res = await updateUserDetails(data).unwrap();
      toast.success(res.message);
      dispatch(setCredentials({...res}));
      console.log("res", res);
      
      await refetch();
     
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (userData?.data) {
      reset(userData?.data);
      setIsInitialLoad(false);
    }
  }, [reset, userData?.data]);

  

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading user details</div>;

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Update Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="fullName">
            Full Name
          </label>
          <Controller
            control={control}
            name="fullName"
            rules={{ required: "Full name is required" }}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                id="fullName"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#bae51a]"
                placeholder="Enter your full name"
              />
            )}
          />
          {errors.fullName && <p className="text-red-600">{errors.fullName.message}</p>}
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            Username
          </label>
          <Controller
            control={control}
            name="username"
            rules={{ required: "Username is required" }}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                id="username"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#bae51a]"
              />
            )}
          />
          {errors.username && <p className="text-red-600">{errors.username.message}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#bae51a]"
              />
            )}
          />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>

           {/* Tagline */}
           <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="tagline">
            Tagline
          </label>
          <Controller
            control={control}
            name="tagline"
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                id="tagline"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#bae51a]"
              />
            )}
          />
        </div>

        {/* About */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="about">
            About
          </label>
          <Controller
            control={control}
            name="about"
            render={({ field }) => (
              <textarea
                {...field}
                id="about"
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#bae51a]"
              ></textarea>
            )}
          />
        </div>

        {/* Facebook URL */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="facebookUrl">
            Facebook URL
          </label>
          <Controller
            control={control}
            name="facebookUrl"
            render={({ field }) => (
              <Input
                {...field}
                type="url"
                id="facebookUrl"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#bae51a]"
              />
            )}
          />
        </div>

        {/* GitHub URL */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="githubUrl">
            GitHub URL
          </label>
          <Controller
            control={control}
            name="githubUrl"
            render={({ field }) => (
              <Input
                {...field}
                type="url"
                id="githubUrl"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#bae51a]"
              />
            )}
          />
        </div>

        {/* LinkedIn URL */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="linkedInUrl">
            LinkedIn URL
          </label>
          <Controller
            control={control}
            name="linkdenUrl"
            render={({ field }) => (
              <Input
                {...field}
                type="url"
                id="linkdenUrl"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#bae51a]"
              />
            )}
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-gray-900 hover:bg-gray-700 text-white font-medium py-2.5 rounded-lg transition-colors ${
            isUpdating ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isUpdating}
        >
          {isUpdating ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </>
  );
}

export default UpdateProfileForm;
