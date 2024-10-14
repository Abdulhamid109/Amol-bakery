import { connect } from "@/DBconfig/dbconfig";
import { getDatafromToken } from "@/helpers/getTokenData";
import User from "@/models/usermodal";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request:NextRequest) {
    try {
        const req = await request.json();
        const {newpassword} = req;
        //current ka password update karna hai but woh abhi login nai hai so no jwt
        const userid = await getDatafromToken(request);
        const db = await User.findById({_id:userid});
        db.password = newpassword;
        await db.save();
        return NextResponse.json(
            {message:"Successfull Updation of password"},
            {status:200}
        )
    } catch (error) {
        console.log("Someething went wrong "+String(error));
        return NextResponse.json(
            {error:String(error)},
            {status:500}
        )
    }
}