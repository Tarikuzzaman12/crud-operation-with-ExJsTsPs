import express, { NextFunction, Request, Response } from "express"
import config from "./config"
import initDB, { pool } from "./config/db"
import logger from "./middleware/logger"
import { userRoutes } from "./modules/user/user.routes"

// const express = require('express')
const app = express()
const port = config.port
// add parser
// json data
app.use(express.json())
// initializing DB
initDB()

app.get('/',logger, (_req:Request, res:Response) => {
  res.send('Hello Next level web-Development!')
})
// user crud
app.use("/users",userRoutes)

// delete user 
// app.delete("/users/:id",async(_req:Request, res:Response)=>{
//   // console.log(_req.params.id)
//   try{
//     const result = await pool.query(`DELETE FROM users WHERE id=$1`,[_req.params.id])
//     if(result.rowCount == 0){
//       res.status(404).json({
//             success:false,
//             message:"Users not found",
      
//       })
//     }else{
//       res.status(201).json({
//            success:true,
//             message:"Users deleted successfully",
//             data:null
//       })
//     }
//   }catch(err:any){
//     res.status(500).json({
//       status:false,
//       message:err.message
//     })
//   }

// })

// TOODO CRUD
// post todos
app.post("/todos", async (_req:Request, res:Response) =>{
  const {user_id,title}=_req.body

try{
    const result = await pool.query(`INSERT INTO todos(user_id,title) VALUES($1,$2) RETURNING *`,[user_id,title])
    res.status(201).json({
      success:true,
      message:"ToDos are creaed",
      data:result.rows[0]

    })

  }catch(err){
    res.status(500).json({
      success:false,
      message:"file are not created"
    })
  }

})

// get todos
app.get("/todos",async (_req:Request, res:Response) =>{
  try{
    const result = await pool.query(`SELECT * FROM todos`)
    res.status(201).json({
      success:true,
      message:"todos retrived successfully",
      data:result.rows


    })
  }catch(err:any){
    res.status(500).json({
      succes:false,
      message:err.message,
      details:err
    })

  }
})

// Get single todo
app.get("/todos/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos WHERE id = $1", [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch todo" });
  }
});
// update todos
app.put("/todos/:id",async (_req:Request,res:Response) =>{
  const {title}=_req.body
   try{
    const result = await pool.query(`UPDATE todos SET title=$1  WHERE id=$2
 RETURNING *`,[title,_req.params.id])
    if(result.rows.length === 0){
      res.status(404).json({
            success:false,
            message:"todos not found not found",
      
      })
    }else{
      res.status(200).json({
           success:true,
            message:"todos update successfuly",
            data:result.rows[0]
      })
    }
  }catch(err:any){
    res.status(500).json({
      status:false,
      message:err.message
    })
  }

})

// Delete todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM todos WHERE id=$1 RETURNING *",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ success: true, message: "Todo deleted", data: null });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

// Not Found Route
app.use((_req,res) =>{
  res.status(404).json({
    success:false,
    message:"Route Not Found",
    path:_req.path
  })

})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
