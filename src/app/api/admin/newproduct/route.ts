import { connect } from "@/DBconfig/dbconfig";
import product from "@/models/productmodal";
import { NextRequest, NextResponse, } from "next/server";


connect()

export async function POST(request:NextRequest) {
    try {
        //use of formdata to get the information
        const ProductData = await request.formData();
        const name = ProductData.get('product_name');
        const price = ProductData.get('product_price');
        const isavailable = ProductData.get('isAvailable');
        const detail = ProductData.get('product_detail');
        const image = ProductData.get('product_image') as File||null;
        const imageType = ProductData.get('product_image_type');

        if(!name||!price||!isavailable||!detail||!image||!imageType){
            return NextResponse.json(
                {message:"No input Data Available"},
                {status:404}
            )
        }

        //convert the image to buffer
        const bufferData = await image.arrayBuffer();
        const buffer = Buffer.from(bufferData);

        const newProduct = new product({
            product_name:name,
            product_price:price,
            isAvailable:isavailable,
            product_detail:detail,
            product_image:buffer,
            product_image_type:image.type
        });

        const savedProduct = await newProduct.save();
        console.log(savedProduct);
        return NextResponse.json(
            {message:"Successfull Product entry",savedProduct,status:200}
        );
        
    } catch (error) {
        console.log("Something went wrong!!"+String(error));
        return NextResponse.json(
            {error:String(error)},
            {status:500}
        )
    }
}