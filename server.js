import exp from 'express';
import {connect} from 'mongoose'
import {userApp} from "./API/userAPI.js";
import {productApp} from"./API/productAPI.js";
import cookieParser from 'cookie-parser';
const app=exp();
//add body parser
app.use(exp.json())
//forward req to userApp if path starts  with /user-api
//connect to db server
app.use(cookieParser())

app.use('/user-api',userApp);
app.use('/product-api',productApp);
async function connectDB()
{try{
    await connect("mongodb://localhost:27017/anuragdb")
    console.log("db connection success")
    app.listen(4000,()=>console.log("server on port 4000...."))
}catch(err)
{
    console.log("err in db connection:",err);
}
}
connectDB();
// //error handling middleware
// app.use((err,req,res,next)=>{
//     if(err.name==="ValidationError"){
//         return res.status(400),json({message:"error occured",error:err.message})
//     }
//     if(err.name==="CastError"){
//         return res.status(400),json({message:"error occurred",error:err.message})    }
//         res.status(500).json({message:"error occurred",error:"Server error"})
// })