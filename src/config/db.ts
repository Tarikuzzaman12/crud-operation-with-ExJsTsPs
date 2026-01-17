import {Pool} from "pg"
import config from "."

// from data
// app.use(express.urlencoded())

// DB
 export const pool =new Pool({
    connectionString:`${config.connection_str}`
})

// Table create 
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
export default initDB