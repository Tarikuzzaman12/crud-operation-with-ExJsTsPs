import express, { Request, Response } from "express"
// const express = require('express')
const app = express()
const port = 5000

app.get('/', (_req:Request, res:Response) => {
  res.send('Hello Next level web-Development!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
