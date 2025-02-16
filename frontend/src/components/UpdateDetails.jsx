
import UpdatePassword from "./UpdatePassword";
import UpdateProfileForm from "./UpdateProfileForm";
import CoverImage from "./CoverImage";
import UserAvatar from "./UserAvatar";

const UpdateDetails = () => {
  
  // const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
  //   defaultValues: userData?.data  || {
  //     fullName: '',
  //     username: '',
  //     email: '',
  //     tagline: '',
  //     about: '',
  //     facebookUrl: '',
  //     githubUrl: '',
  //     linkedInUrl: ''
  //   }
  // });
  
  // const watchFields = watch();
  // const [ updateCoverImage ] = useUpdateUserCoverImageMutation()
  // const [updateAccountDetails] = useUpdateAccountDetailsMutation()
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (userData?.data) {
  //     reset(userData?.data);
      
  //   }

  // },[reset, userData?.data]);



  // const onSubmit = async(formData) => {

  //   try {

  //     const res = await updateAccountDetails(formData).unwrap();
      
  //     dispatch(setCredentials({...res}));
  //     console.log("Updated user info in Redux:", getState().auth.userInfo);

  //     toast.success("Account updated successfully")
  //     console.log("Credentials updated")

  //   } catch (err) {
  //     toast.error( err?.data?.message || err.error)
  //   }
  // }


  // const isFieldUpdated = Object.keys(watchFields).some((key) => watchFields[key] !== userData?.data[key]);
  

  
 
  // if(isLoading) return <Loader />
  // if( error)  return <div>Error loading user data</div>;
  
return (
  <>
   <h3 className="text-4xl font-bold mb-8 text-center text-[#bae51a]">Update Your Profile</h3>
   <div className="p-8 bg-gray-1000 min-h-screen flex flex-col items-center max-w-4xl mx-auto rounded-lg shadow-md">
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mb-8 ">
    
     
    <UpdateProfileForm/>


   
     <CoverImage/>

    <UpdatePassword/>

    <UserAvatar/>
    

    
    </div>
    </div>

</>
)
}



export default UpdateDetails;
