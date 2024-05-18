
const mongoose = require('mongoose');

require("dotenv").config();

const connnectWithDb = () =>{
    mongoose.connect(process.env.DATABASE_URL)

    .then(()=>{console.log("connection succcessfull")})    
    .catch( (error) =>{
        console.log("unsucccessfull connection")
        console.error(error.meassage);
        process.exit(1);
        }) ; 
}

module.exports = connnectWithDb;