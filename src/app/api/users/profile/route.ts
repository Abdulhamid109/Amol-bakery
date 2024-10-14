import { connect } from "@/DBconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { getDatafromToken } from "@/helpers/getTokenData";
import User from "@/models/usermodal";

connect();
//protexted route
export async function GET(request: NextRequest) {
    try {
        //get the id from jwt
        const UserID = await getDatafromToken(request);
        if (!UserID) {
            return NextResponse.json(
                { message: "Failed to fetch the credentails" },
                { status: 500 }
            )
        }
        const CurrentUser = await User.findById(UserID).select("-password")
        return NextResponse.json(
            { message: "Current User credentails ", CurrentUser, status: 200 },

        )
    } catch (error) {
        console.log("Something went wrong " + String(error));
        return NextResponse.json(
            { error: "something went wrong!!" },
            { status: 500 }
        )
    }
}