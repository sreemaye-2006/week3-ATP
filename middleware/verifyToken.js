import jwt from 'jsonwebtoken'
const {verify}=jwt
export function verifyToken(req,res,next){
const token=req.cookies?.token;
if(!token){
    return res.status(401).json({message:"pls login"})
}
//if token is existed
try{
const decodedToken=verify(token,'abcdef');
console.log(decodedToken);
next();
}catch(err){
res.status(401).json({message:"session expired.pls relogin"})
}
}
//to access cookies property of request object we need cookie parser middleware otherwise req.cookies is undefiend