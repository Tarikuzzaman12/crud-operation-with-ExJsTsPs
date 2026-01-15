import express, { Request, Response } from "express"
import {Pool} from "pg"
import dotenv from "dotenv"
import path from "path"

dotenv.config({path:path.join(process.cwd(),".env")})
// const express = require('express')
const app = express()
const port = 5000

// add parser
// json data
app.use(express.json())
// from data
// app.use(express.urlencoded())

// DB
const pool =new Pool({
    connectionString:`${process.env.CONNECTION_STR}`
})

const initDB=async() =>{
  await pool.query(
    `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    age INT,
    phone VARCHAR(15),
    adress TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
)`)

   await pool.query(`
     CREATE TABLE IF NOT EXISTS todos(
     id SERIAL PRIMARY KEY,
     user_id INT REFERENCES users(id) ON DELETE CASCADE,
     title VARCHAR(250) NOT NULL,
     description TEXT,
     completed BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()

     ) 
    `)



}
initDB()

app.get('/', (_req:Request, res:Response) => {
  res.send('Hello Next level web-Development!')
})
app.post('/users', async (_req:Request, res:Response) => {
 const {name,email}=_req.body
 try{
  const result = await pool.query(`INSERT INTO users(name,email) VALUES($1, $2) RETURNING *`,[name,email])
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

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
