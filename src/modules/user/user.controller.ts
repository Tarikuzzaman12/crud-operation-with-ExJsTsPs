import { pool } from "../../config/db"
import { Request, Response } from "express"
import { userServices } from "./user.service"

// create user 
const createuser = async (_req:Request, res:Response) => {
 const {name,email,password,role}=_req.body
 try{
  const result = await  userServices.createUser(name,email,password,role)
  // console.log(result.rows[0])
   res.status(201).json({
    success:false,
    message:"Data Insarted Successfully",
    data:result.rows[0]
     })

 }catch(err:any){
  res.status(500).json({
    success:false,
    message:err.message

  })
 }

}
// get all user
const getUser = async (_req:Request, res:Response) =>{
  try{
    const result = await userServices.getUser()
    res.status(201).json({
      success:true,
      message:"Users retrived successfully",
      data:result.rows


    })
  }catch(err:any){
    res.status(500).json({
      succes:false,
      message:err.message,
      details:err
    })

  }
}

// get singleuser
const getSingleUser=async(_req:Request, res:Response)=>{
  // console.log(_req.params.id)
  try{
    const result = await userServices.getSingleUser(_req.params.id as string)
    if(result.rows.length == 0){
      res.status(404).json({
            success:false,
            message:"Users not found",
      
      })
    }else{
      res.status(201).json({
           success:true,
            message:"Users fatch",
            data:result.rows[0]
      })
    }
  }catch(err:any){
    res.status(500).json({
      status:false,
      message:err.message
    })
  }

}
// update user
const updateUser = async(_req:Request, res:Response)=>{
  // console.log(_req.params.id)
  const {name,email}= _req.body
  try{
    const result = await userServices.updateUser(name,email,_req.params.id as string)
    if(result.rows.length == 0){
      res.status(404).json({
            success:false,
            message:"Users not found",
      
      })
    }else{
      res.status(200).json({
           success:true,
            message:"Users update successfuly",
            data:result.rows[0]
      })
    }
  }catch(err:any){
    res.status(500).json({
      status:false,
      message:err.message
    })
  }

}
// delete user
const deleteUser= async(_req:Request, res:Response)=>{
  // console.log(_req.params.id)
  try{
    const result = await userServices.deleteUser(_req.params.id as string)
    if(result.rowCount == 0){
      res.status(404).json({
            success:false,
            message:"Users not found",
      
      })
    }else{
      res.status(201).json({
           success:true,
            message:"Users deleted successfully",
            data:null
      })
    }
  }catch(err:any){
    res.status(500).json({
      status:false,
      message:err.message
    })
  }

}



export const userControllers = {
    createuser,getUser,getSingleUser,updateUser,deleteUser
}