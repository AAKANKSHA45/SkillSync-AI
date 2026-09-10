const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model.js");


/**
 * SIGN UP
* @namme registerUserController 
* @description Register as a new user with username , email , password
 * @access public
 */

async function registerUserController(req , res){
    const {username , email , password} = req.body

    // if username or email or password is not given by user :-
    if(!username || !email || !password){
        return res.status(400).json({
            message: "please provide username , email and password"
        })
    }

    
    const isUserAlreadyExist = await userModel.findOne({ //searching username into db i.e Find a user whose username matches OR whose email matches
        $or: [{username} , {email}] //findOne fn returns a document
    })
    
    //  if given username or password already exist :
    if(isUserAlreadyExist){ // isUserAlreadyExists.username == username
        return res.status(400).json({
            message: "Account already exists with this username or email"
        })
    }

    const hashedPassword = await bcrypt.hash(password , 10) // hashing the password with salt rounds 10

    const user = await userModel.create({ // creating a new user in db
        username,
        email,
        password: hashedPassword
        // above is shorcut of :
         // username: username,
         // email: email,
        //  password: hashedPassword
    })

    // creating token for this user
    const token = jwt.sign( //jwt.sign() method is used by server to creates jwt token 
        {
            id: user._id, //payload
            username: user.username //payload

        },
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    // the server sends that token  to the browser:-
     res.cookie("token" , token)


    //  Send a response to the client with HTTP status 201, and in that response send this JSON message.
     res.status(201).json({ // 201 status code means that the request has been fulfilled and has resulted in one or more new resources being created.
        message: "User registered successfully ",
        user:{
            id: user._id,
            username: user.username,
            email: user.email

        }
     })


}


/**
 * LOGIN
* @namme loginUserController
* @description Login as a user with username , password
 * @access public
 */

async function loginUserController(req , res){
    const {email , password} = req.body;

    const user = await userModel.findOne({email}) //return a document 

    if(!user){ //user of entered email does not exist
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    // if email exist then match password
    const isPasswordValid =await bcrypt.compare(password , user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"  
        })
    }

    // creating jwt (token)
     const token = jwt.sign( 
        {
            id: user._id,
            username: user.username

        },
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token" , token);
    
    res.status(200).json({
        user:{
            id: user._id,
            username: user.username,
            email: user.email,

        }

    })
   




}



/**
 * LOGOUT
* @namme logoutUserController
* @description Logout as a user with username , password
 * @access public
 */

async function logoutUserController(req, res) {
    const token = req.cookies.token; // Get the token from the request cookies
    if(token){
        //tokenBlacklisting
        await tokenBlacklistModel.create({token}) // Add the token to the blacklist collection in the database
    }

    res.clearCookie("token"); // Clear the token cookie from the user's browser
    res.status(200).json({
        message: "User logged out successfully"
    });
}


/**
 * 
* @namme getMeController
* @description get the current logged in user details 
 * @access private
 */

async function getMeController(req , res){
    const user = await userModel.findById(req.user.id) ;

    res.status(200).json({
        message:"User details fetched successfully",
        user:{
            id: user._id,
            username : user.username,
            email : user.email,
        }
    })

}














module.exports = { // exporting obj with properties : 
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController,
};