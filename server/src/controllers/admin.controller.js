import User from "../models/User.js";


export const getNewUsers=async(req,res)=>{
    try{
const users=await User.find()
res.status(200).json({
    succeess:true,
    users
})
    }
    catch(err){
res.status(500).json({
    success:false,
    err:err.message
})
    }
}


export const updateNewUser=async(req,res)=>{
    const {status}=req.body
    const {id}=req.params
    // console.log(req.params)
    try{
const user=await User.findOneAndUpdate({_id:id},{$set:{status:status}})
res.status(201).json({
    success:true,
    message:"user update successfully"
})

    }catch(err){

    }
}

export const getNewLister=async(req,res)=>{
    try{
 const users = await User.find({ acc_no: { $exists: true, $ne: null } });
res.status(200).json({
    succeess:true,
    users
})
    }
    catch(err){
res.status(500).json({
    success:false,
    err:err.message
})
    }
}


export const updateNewLister=async(req,res)=>{
    const {isLister}=req.body
    const {id}=req.params
    // console.log(req.params)
    try{
const user=await User.findOneAndUpdate({_id:id},{$set:{isLister:isLister}})
console.log(user)
res.status(201).json({
    success:true,
    message:"user update successfully"
})

    }catch(err){

    }
}