
// context api

import {createContext , useState , useEffect} from "react";
import {getMe} from "../api/auth.api.js"; 
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
      
    const [user , setUser] = useState(null); //initially user is null because we don't have any user logged in when the app starts
    const [loading , setLoading] = useState(true); //initially loading is true because we are making an api call to get the user data when the app starts and we don't want to show the children components until we get the user data from the api call



    // we are passing the user and setUser function to the context so that we can use it in other components
    return (
        <AuthContext.Provider value={{user , setUser , loading , setLoading}}> 
            {children}
        </AuthContext.Provider>
    )
}
    
