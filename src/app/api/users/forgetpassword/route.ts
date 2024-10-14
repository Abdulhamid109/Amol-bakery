import { connect } from "@/DBconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/OTPmail";
import toast from "react-hot-toast";
import User from "@/models/usermodal";
import jwt from 'jsonwebtoken';
connect();

export async function POST(request:NextRequest) {
    try {
        //email and 
        const req = await request.json();
        const {email} = req; 
        const db = await User.findOne({email});
        if(!db){
            return NextResponse.json(
                {message:"Enter your registered email"},
                {status:404}
            )
        }
        await sendEmail({email});
        toast.success("OTP send to email successfully");
        //jwt setup
        const tokenData = {
            id:db._id,
            name : db.name,
            email:db.email
        }
        const token = jwt.sign(tokenData,process.env.SECRET_KEY!,{expiresIn:'1d'});

        //cookies setup
        const response =  NextResponse.json(
            {message:"OTP send to email successfully"},
            {status:200}
        )
        response.cookies.set('token',token,{
            httpOnly:true//so that the user cannot manipulate it
        });
        
        return response;
    } catch (error) {
        console.log("Something went wrong!!");
        return NextResponse.json(
            {error:String(error)},
            {status:500}
        )
    }
}
