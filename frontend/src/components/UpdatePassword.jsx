import {useForm} from "react-hook-form"
import Input from "./Input";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { useChangePasswordMutation } from "../slices/usersApiSlice";

const UpdatePassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const onChangePassword = async (data) => {
        try {
          const res = await changePassword(data).unwrap();
          toast.success(res.message);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      };

return(
    <>
  <h2 className=" mt-5 text-lg font-semibold mb-4">Change Password</h2>
  <form  onSubmit={handleSubmit(onChangePassword)} >
    <div className="mb-4">
      <label className="block text-gray-700 mb-2" htmlFor="currentPassword">
        Current Password
      </label>
      <input
       {...register("currentPassword", { required: "Current password is required" })}
       type="password"
       id="currentPassword"
       className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#bae51a]"
       placeholder="Enter current password"
     />
   </div>
   <div className="mb-4">
     <label className="block text-gray-700 mb-2" htmlFor="newPassword">
       New Password
     </label>
     <input
       {...register("newPassword", { required: "New password is required" })}
       type="password"
       id="newPassword"
       className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#bae51a]"
       placeholder="Enter new password"
     />
   </div>
   <div className="mb-4">
     <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
       Confirm Password
     </label>
     <input
       {...register("confirmPassword", { required: "Please confirm your new password" })}
       type="password"
       id="confirmPassword"
       className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#bae51a]"
       placeholder="Confirm new password"
     />
   </div>
   {isLoading && <Loader/>}
   <button
     type="submit"
     className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 font-medium"
   >
     Save Password
   </button>
 </form>

    </>
)
}



export default UpdatePassword