// connect with server (express) with the database
// const mongoose = require("mongoose");
// async function connectToDb (){

//     try{
//          await mongoose.connect(process.env.MONGO_URL);
//          console.log("DB is connected!!");
//     }catch(err){
//         console.log(err);

//     }
  

// }

// module.exports = connectToDb

const mongoose = require("mongoose");

async function connectToDb() {
    try {
        console.log("URI:", process.env.MONGO_URL);

        await mongoose.connect(process.env.MONGO_URL);

        console.log("DB is connected!!");
    } catch (err) {
        console.error("Name:", err.name);
        console.error("Message:", err.message);
        console.error("Code:", err.code);
        console.error("Cause:", err.cause);
        console.error(err);
    }
}

module.exports = connectToDb;