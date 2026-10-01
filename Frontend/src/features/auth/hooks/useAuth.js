// HOOK LAYER - connects the context layer to the api layer


import {useContext , useEffect} from "react"
import { AuthContext } from "../auth.context.jsx"
import {register , login , logout , getMe} from "../services/auth.api.js"



export const useAuth = () => {
    const context = useContext(AuthContext);
    const {user , setUser , loading , setLoading} = context; //destructuring the context to get the user and setUser function

    const handleLogin = async (email , password) => {
       try{
         setLoading(true) //setting loading to true because we are making an api call and we want to show a loading spinner in the UI
        const data = await login({email , password}) //calling the login function from the api layer(auth.api.js) , it will return the user data after successful login which was sent by the backend(auth.controller.js)
        setUser(data.user) //setting the user data in the context

       }catch(err){
        console.log(err);

       }finally{
        setLoading(false) //setting loading to false because the api call is done and we want to hide the loading spinner in the UI
       } //we are using finally block because we want to set loading to false whether the api call is successful or not because we want to hide the loading spinner in the UI after the api call is done
       
        
    
    }

    const handleRegister = async({username , email , password}) =>{
       
       try{
           setLoading(true)
           const data = await register({username , email ,password})
           setUser(data.user) //user is set by backend
       }catch(err){
           console.log(err);
       }finally{
           setLoading(false)

       }
       
        
    }

    const handleLogout = async () => {
       try{
         setLoading(true)
         await logout() //calling the logout function from the api layer(auth.api.js) , it will clear the token cookie from the user's browser and also add the token to the blacklist collection in the database which was sent by the backend(auth.controller.js)
         setUser(null) //setting the user to null because we have logged out the user
       }catch(err){
         console.log(err);
       }finally{
         setLoading(false) //setting loading to false because the api call is done and we want to hide the loading spinner in the UI

       }
        
    }

   
     useEffect(()=>{ //see reason of using  in OneNote  

        const getAndSetUser = async() =>{
            const data = await getMe() //calling the getMe function from the auth.api.js file to get the user data from the backend and storing it in the data variable
            setUser(data.user) 
            setLoading(false) //setting the loading state to false because we have got the user data from the api call and we can now render the children components
        }

        getAndSetUser() //calling the getAndSetUser function to get the user data from the backend and set it in the user state

    } , [])
    // useEffect is written inside useAuth because
    //  checking the current logged-in user is part of authentication logic.
    //  When a component calls useAuth(), this effect is set
    //  up and runs after that component's first render.


    return { user , loading , handleLogin , handleRegister , handleLogout } 
    //returning the user because we want to use the user data in the components and returning the loading state because we want to show a loading spinner in the UI when the api call is being made



}