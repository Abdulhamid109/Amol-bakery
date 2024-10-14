import { connect } from "@/DBconfig/dbconfig";
import product from "@/models/productmodal";
import { NextResponse } from "next/server";

connect();

export async function GET() {
    try {
        const products = await product.find();
        if(!products){
            return NextResponse.json(
                {message:"no products at the current moment"},
                {status:404}
            )
        }
        return NextResponse.json(
            { products },  
            { status: 200 } 
        );
    } catch (error) {
        console.log("Something went wrong "+String(error));
        return NextResponse.json(
            {error:"Something went wrong"},
            {status:500}
        )
        
    }
}