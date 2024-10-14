import { connect } from "@/DBconfig/dbconfig";
import { getDatafromToken } from "@/helpers/getTokenData";
import User from "@/models/usermodal";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request:NextRequest) {
    try {
        const req = await request.json();
        const {otp} = req;
        //get the uid from token
        const userid = await getDatafromToken(request);
        const db = await User.findById({_id:userid});
        if(db.forgotPasswordToken !== otp){
            return NextResponse.json(
                {error:"Invalid OTP"},
                {status:500}
            )
        }
        console.log("Successfull OTP verification");
        return NextResponse.json(
            {error:"Successfull OTP verification"},
            {status:200}
        )
        
    } catch (error) {
        console.log("Something went wrong!!"+String(error));
        return NextResponse.json(
            {error:String(error)},
            {status:500}
        )
    }
}