import { authServices } from "./auth.service"
import {Request,Response}  from "express";


const loginUser = async (_req:Request,res:Response) => {
    const { email,password } = _req.body
    try{
    const result = await authServices.loginUser(email,password)
      // console.log(result.rows[0])
       res.status(200).json({
        success:true,
        message:"login successfull ",
        data:result
         })
    
     }catch(err:any){
      res.status(500).json({
        success:false,
        message:err.message
    
      })
     }
}
export const authController={
    loginUser
}