import { connect } from "@/DBconfig/dbconfig";
import User from "@/models/usermodal";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from 'bcrypt';
connect();

export async function POST(request:NextRequest) {
    try {
        //take data from the body
        const resBody = await request.json();
        const {name,email,password} = resBody;
        //check wether user is present already
        const ispresent = await User.findOne({email:email});
        if(ispresent){
            console.log("Account Already exists,Login");
            return NextResponse.json(
                {message:"Account already exists ,Login"},
                {status:404}
            );
        }
        //create a new account
        //bcrypt the password
        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,genSalt);

        //save to the db
        const newUser = new User({
            name,
            email,
            password:hashedPassword
        });

        const savedUser = await newUser.save();

        console.log(savedUser);
        return NextResponse.json(
            {message:"Account Successfully created!!"+savedUser},
            {status:200}
        )
        
    } catch (error) {
        console.log("Something went Wrong "+String(error));
        return NextResponse.json(
            {error:"Something went Wrong"},
            {status:500}
        )
        
    }
}