import {createBrowserRouter} from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";


export const router = createBrowserRouter([
    {
        path: "/login" ,
        element:<Login/>
    },
    {
        path: "/register" ,
        element:<Register/>
    },
    {
        path: "/",
        element:<Protected><h1>Welcome to SkillSync AI</h1></Protected> //if user is logged-in then only render the children components because we are using the Protected component here which is a higher order component that checks if the user is logged-in or not and if not then it will navigate to the login page
    }
])