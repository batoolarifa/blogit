
import UserProfile   from "../components/UserProfile"
import { useParams } from "react-router-dom";
const  UserProfilePage = () => {

  const {username} = useParams();
  
  
  return (
    <>
    <UserProfile username={username} />
    </>
    
  )
}

export default UserProfilePage;

