import { connect } from "@/DBconfig/dbconfig";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import Admin from "@/models/adminmodal";
connect();

export async function POST(request:NextRequest) {
    try {
        //take data from the body
        const resBody = await request.json();
        const {name,email,password,shopNumber} = resBody;
        //check wether user is present already
        const ispresent = await Admin.findOne({email:email});
        if(ispresent){
            console.log("Account Already exists,Login");
            return NextResponse.json(
                {message:"Account already exists ,Login"},
                {status:200}
            );
        }
        //create a new account
        //bcrypt the password
        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,genSalt);

        //save to the db
        const newAdmin = new Admin({
            name,
            email,
            password:hashedPassword,
            shopNumber
        });

        const savedAdmin = await newAdmin.save();

        console.log(savedAdmin);
        return NextResponse.json(
            {message:"Account Successfully created!!"+savedAdmin},
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