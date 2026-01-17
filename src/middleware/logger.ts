import { NextFunction, Request, Response } from "express"


const logger= (_req:Request,res:Response,next:NextFunction) =>{
  console.log(`[${new Date().toISOString()} ${_req.method} ${_req.path}\n`)
  next()
}
export default logger