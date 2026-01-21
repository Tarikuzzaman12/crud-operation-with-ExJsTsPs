// higher order function 
import {NextFunction, Request,Response}  from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (p0: string) =>{
 return (_req:Request, res:Response,next:NextFunction) => {
    const token = _req.headers.authorization
    if(!token){
        return res.status(500).json({
         message:"you are not allowed"
        })
    }
    const decoded = jwt.verify(token, config.jwtSecret as string);
    console.log(decoded)
    _req.user =decoded as JwtPayload
    return next()

 }
}
export default  auth
