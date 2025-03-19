const express=require("express")
const app=express()


app.get("/",(req,res)=>{
    res.status(200).json({
        "success":true,
        "message":"connect with server"
    })
})

app.listen(4000,()=>{
    console.log("server is running at port 4000")
})