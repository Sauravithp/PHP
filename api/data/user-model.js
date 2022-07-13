const mongoose=require("mongoose");
require("dotenv").config();


let userScehma=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username: String,
    password: String
});



mongoose.model(process.env.USER_MODEL_NAME,userScehma,process.env.DATABASE_USER_COLLECTION_NAME);