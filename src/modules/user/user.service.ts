import { pool } from "../../config/db"
import bcrypt from "bcryptjs";


// post user 
const createUser = async (name:string,email:string,password:string,role:string) =>{
    const hashedPass = await bcrypt.hash(password,10)
    const result = await pool.query(`INSERT INTO users(name,email,password,role) VALUES($1, $2,$3,$4) RETURNING *`,[name,email,hashedPass,role])
    return result
}

// get all user 
const getUser= async () =>{
     const result = await pool.query(`SELECT * FROM users`)
     return result
}

// get single user 
const getSingleUser=async(id:string) => {
        const result = await pool.query(`SELECT * FROM users WHERE id=$1`,[id])
        return result 
}
// update user 
const updateUser = async (name:string,email:string,id:string) =>{
    const result = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3
 RETURNING *`,[name,email,id])
 return result 
}
// Delete user 
const deleteUser = async (id:string) => {
    const result = await pool.query(`DELETE FROM users WHERE id=$1`,[id])
    return result 
}


export const  userServices ={
    createUser,getUser,getSingleUser,updateUser,deleteUser 
}