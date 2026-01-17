import express,{Request,Response}  from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";

const router =express.Router()

// app.user("/users",userRouter)

// routes -> controller -> service
// post user 
router.post("/",userControllers.createuser)

// get all user 
router.get("/",userControllers.getUser)

// get single user 
router.get("/:id",userControllers.getSingleUser)
// update user 
router.put("/:id",userControllers.updateUser)
// delete  user 
router.delete("/:id",userControllers.deleteUser)


export const userRoutes = router


