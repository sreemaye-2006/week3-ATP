import exp from 'express'
import {UserModel} from '../models/productModel.js'
export const productApp=exp.Router()
 
productApp.post("/product",async(req,res)=>{
const newProduct=req.body;
const newUserDocument=new UserModel(newProduct)
const result=await newUserDocument.save()
console.log("result:",result);
res.status(201).json({message:"user created"})
});
productApp.get("/product",async(req,res)=>{
    let userList=await UserModel.find()
    res.status(200).json({message:"products",payload:userList})
})
productApp.get("product/:productId",async(req,res)=>{
    const uid=req.params.productId
    const UserObj=await UserModel.findById(uid)
    res.status(200).json({message:"product",payload:userObj})

if(!userObj)
{
  return  res.status(404).json({message:"product not found"})
}
})
productApp.put("/product/:iproductId",async(req,res)=>{
    //get mofified user from req
    const modifiedProduct=req.body;
    const uid=req.params.id;
    //find user by id
    const updateProduct=await UserModel.findByIdAndUpdate(uid,{$set:{...modifiedProduct}},{new:true, runValidators:true})
     //update user id
     res.status(200).json({message:"product modified",payload:updateProduct})
   // send res
})
productApp.delete("/product/:ProductId",async(req,res)=>{
    const modifiedData=req.body;
    const uid=req.params.id
    const deletedProduct=await UserModel.findByIdAndDelete(uid)
    if(!deletedProduct){
        return res.status(404).json({message:"product not found"})
    }
res.status(200).json({message:"product deleted",payload:deletedProduct})
})