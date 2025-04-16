// const express=require("express")
// const connectDB=require("../config/db")
import express from 'express'
import connectDB from './config/db.js'
import routes from './routes/index.js'
import cors from 'cors'
import cookies from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'

const app=express()

connectDB()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

app.use('/public/images',express.static(path.join(__dirname,'public/images')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookies());
const corsOptions = {
    origin:'http://localhost:5173',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials:true
}
app.use(cors(corsOptions));

app.get("/test",(req,res)=>{
    res.status(200).json({
        "success":true,
        "message":"connect with server"
    })
})

app.use("/api",routes)

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({
//         success: false,
//         message: 'Internal Server Error'
//     });
// });

app.listen(4000,()=>{
    console.log("server is running at port 4000")
})