const jwt = require("jsonwebtoken"); // package to verify jwt token (also use for create token)
const tokenBlacklistModel = require("../models/blacklist.model.js");


// Authentication middleware should be applied to every API that requires a logged-in user e.g /get-me , /profile  /posts etc
async function authMiddleware(req , res , next){
        const token = req.cookies.token; // getting the token from user cookie
        
         if(!token){ //token is not present in the cookie
            return res.status(401).json({
                message: "Unauthorized access! Please login to access this resource"
            })
        }
        //token is found but checking it is blacklisted or not 
        const isTokenBlacklisted = await tokenBlacklistModel.findOne({token})

        if(isTokenBlacklisted){ //token is blacklisted
            return res.status(401).json({
                message :"Invalid token"
            })
        }
     //now if everything is fine then :
        //verifying token :
      try{
        const decoded =  jwt.verify(token , process.env.JWT_SECRET )
        req.user = decoded; // adding the decoded user info to the request object(in a custom property - user) for further use in the next middleware or route handler
        next(); // calling the next middleware or route handler
      }catch(err){
        return res.status(401).json({
            message: "invalid token! Please login to access this resource"
        })
      }

    //   decoded contains the payload data that was stored inside the JWT (token)
    //{
//     id: "64abc123...", ->payload
//     username :"akkkk", -> payload
//     iat: 1757350000, -> added by jwt
//     exp: 1757436400 -> added by jwt
// }
       
  }

module.exports = {authMiddleware};