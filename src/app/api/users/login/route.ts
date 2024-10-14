import { connect } from "@/DBconfig/dbconfig";
import User from "@/models/usermodal";
import { NextRequest ,NextResponse} from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
connect();

export async function POST(request:NextRequest) {
    try {
        const req = await request.json();
        const {email,password} = req;
        //check if user exists or not
        const ispresent = await User.findOne({email});
        console.log(ispresent);
        
        if(!ispresent){
            console.log("User not found ,Signup");
            return NextResponse.json(
                {message:"Acount does not exists"},
                {status:404}
            )
        }
        //check the credentails
        const result = bcrypt.compare(password,ispresent.password);
        if(!result){
            return NextResponse.json({
                message:"Wrong Credentails",
                status:400
            });
        }
        //jwt setup
        const tokenData = {
            id:ispresent._id,
            name : ispresent.name,
            email:ispresent.email
        }
        const token = jwt.sign(tokenData,process.env.SECRET_KEY!,{expiresIn:'1d'});

        //cookies setup
        const response =  NextResponse.json(
            {message:"Successfull login"},
            {status:200}
        )
        response.cookies.set('token',token,{
            httpOnly:true//so that the user cannot manipulate it
        });
        
        return response;
    } catch (error) {
        console.log("Something went wrong!!"+String(error));
        return NextResponse.json(
            {error:"Something went wrong!!"},
            {status:500}
        )
        
    }
}