require("dotenv").config(); //to access variables of .env file
const app = require("./src/app");
const connectToDb = require("./src/config/database.js");

connectToDb();
app.listen(3000 , ()=>{
    console.log("server is listening!!");
})