import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    product_name:{
        type:String,
        required:[true,"Enter the product Name"]
    },
    product_price:{
        type:Number,
        required:[true,"Enter the product price"]
    },
    isAvailable:Boolean,
    product_detail:{
        type:String,
        required:[true,"Please enter the product details"]
    },

    //product image(store in buffer ....)
    product_image:{
        type:Buffer,
        required:[true,"please upload the image"]
    },

    product_image_type:{
        type:String,
        required:true
    }
    
})

const product = mongoose.models.products || mongoose.model("products",ProductSchema);

export default product;