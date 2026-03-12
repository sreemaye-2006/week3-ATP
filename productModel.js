import { model,Schema } from "mongoose";
const productSchema=new Schema({
    productId:{
     type:Number,
     required:[true,"id is required"]
    },
    productName:{
        type:String,
        required:[true,"name is required"]
    },
    price:{
        type:Number,
        required:[true,"price is required"],
        min:[10000,"min price is 10000"],
        max:[50000,"max price is 50000"]
    }, brand:{
        type:String,
        required:[true,"brand name is required"]
    }
})

export const UserModel= model("product",productSchema)
