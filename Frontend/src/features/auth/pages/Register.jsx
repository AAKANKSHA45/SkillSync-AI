import React , {useState} from "react"
// import "../auth.form.scss" //if we do not import this file here , then also styling will be apply on this file because of same classes name which are in auth.form.scss file(react feature)
import { useNavigate , Link} from "react-router";
import { useAuth } from "../hooks/useAuth.js";

const Register = () =>{
    const navigate = useNavigate(); 
    //useNavigate is a React Router hook used to navigate from one page/route to another using JavaScript.(means without using Link tag we can navigate by this method)
     const [username , setUsername] = useState(""); //state to store the username input value
     const [email , setEmail] = useState("");
     const [password , setPassword] = useState(""); //state to store the password input value
     
     const {loading , handleRegister} = useAuth(); //destructuring the handleRegister function from the useAuth hook
    
     const handleSubmit = async (e)=>{
        e.preventDefault();
        await handleRegister({username , email , password}) //calling the handleRegister function from the useAuth hook and passing the username , email and password input values
        navigate("/"); //navigating to the home page 
     }

     if(loading){
        return (<main><p>Loading...</p></main>) //showing loading spinner when the api call is being made
    }

    return(
        <main>
        <div className="form-container">
            <h1 className="logo">SignUp</h1>

            <form onSubmit={handleSubmit}>

                <div className="input-group">
                    <label htmlFor="username">Username :</label>
                    <input
                      type="text"
                      id="username" 
                      placeholder="Enter your Username"
                      name="username" value={username}
                      onChange={(e) => setUsername(e.target.value)}>  
                    </input>
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email :</label>
                    <input 
                     type="email"
                     id="email"
                     placeholder="Enter your Email"
                     name="email" value={email}
                     onChange={(e) => setEmail(e.target.value)}></input>
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password :</label>
                    <input 
                      type="password"
                      id="password"
                      placeholder="Enter your Password" 
                      name="password" value={password} 
                      onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </div>

                <button className="button primary-button ">SignUp</button>
            </form>

            <p className="logo">Already have an account? <Link to={"/login"}>Login</Link></p>

        </div>
       </main>
    )
}

export default Register