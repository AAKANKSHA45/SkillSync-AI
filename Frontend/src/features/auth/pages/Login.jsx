import React from "react"
import "../auth.form.scss"
import { useNavigate ,Link } from "react-router"
import { useAuth } from "../hooks/useAuth.js"


const Login = () =>{
    const {loading ,handleLogin} = useAuth(); //Imp* :calling useAuth fn and it will return object with user , loading , handleLogin , handleRegister , handleLogout properties and we are destructuring the loading and handleLogin properties from it.
    const navigate = useNavigate(); //useNavigate is a hook that allows us to navigate to different routes(webpage) in the app

    const [email , setEmail] = useState(""); //state to store the email input value
    const [password , setPassword] = useState(""); //state to store the password input value


    const handleSubmit = async (e)=>{
        e.preventDefault();
       await handleLogin(email , password) //calling the handleLogin function from the useAuth hook and passing the email and password input values
        navigate("/") //navigating to the home page after successful login
    }

     if(loading){
            return (<main><p>Loading...</p></main>) //showing loading spinner when the api call is being made
        }


    return(
       <main>
        <div className="form-container">
            <h1 className="logo">Login</h1>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email :</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password :</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <button className="button primary-button " type="submit">
                    Login
                </button>
            </form>
             <p className="logo">Do not have an account? <Link to={"/register"}>SignUp</Link></p>
             {/*Link is  A progressively enhanced <a href> wrapper to enable navigation with client-side routing. */}

        </div>
       </main>
    )
}

export default Login;