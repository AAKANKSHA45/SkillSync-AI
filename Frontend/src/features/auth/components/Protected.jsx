import {useAuth} from "../hooks/useAuth";
import { Navigate } from "react-router"; //importing the Navigate component from react-router to navigate from one page to another.
// this is different from useNavigate hook because useNavigate hook is used to navigate from one page to another using JavaScript and Navigate component is used to navigate from one page to another using JSX.
//but both are used to navigate from one page to another in react-router.

const Protected = ({children}) =>{
    const {loading , user} = useAuth(); //destructuring the user and loading state from the useAuth hook
  

    if(loading){
        return (<main><p>Loading...</p></main>) //showing loading spinner when the api call is being made
    }

    if(!user){
        return <Navigate to="/login" /> //if user is not logged-in then navigate to login page
    }

    return children; //if user is logged-in then render the children components
}

