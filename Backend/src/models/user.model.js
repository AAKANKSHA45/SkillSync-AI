const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        unique :[true , "username already taken"], //"username already taken" is error msg
        required :true,

    },

    email : {
         type : String,
         unique :[true , "Account already exists with this email address"],
         required :true,
       
    },

    password :{
        type : String,
        required : true
    }

})

const userModel = mongoose.model("User" , userSchema); // users -> collection name
module.exports = userModel;