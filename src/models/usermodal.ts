// create the userSchema
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide the Name"]
    },
    email:{
        type:String,
        required:[true,"Please provide your email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
})

const User = mongoose.models.users || mongoose.model("users",userSchema);

export default User