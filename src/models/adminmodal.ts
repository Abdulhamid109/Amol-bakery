// create the userSchema
import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
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
    shopNumber:{
        type:Number,
        required:[true,"Please enter your shop number"]
    },

    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
})

const Admin = mongoose.models.admins || mongoose.model("admins",AdminSchema);

export default Admin