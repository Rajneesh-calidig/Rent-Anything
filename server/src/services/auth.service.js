// import {logger} from '../config/logger/logger.js'
import User from '../models/User.js'
import bcrypt from 'bcrypt'

export async function findUserByEmail(email){
    try{
        return await User.findOne({email:email})
    }catch(err){
        throw new Error(`Error in findUserByEmail service: ${err}`)
    }
}

export async function findUserByMobile(mobileNumber){
    try{
        return await User.findOne({mobileNumber:mobileNumber})
    }catch(err){
        throw new Error(`Error in findUserByMobile service: ${err}`)
    }
}

export async function findUserById(userId){
    try{
        return await User.findById(userId);
    }catch(err){
        throw new Error(`Error in findUserByMobile service: ${err}`)
    }
}

export async function createUser(email,password,name,mobileNumber){
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return await User.create({email,password:hashedPassword,name,mobileNumber})
    }catch(err){
        throw new Error(`Error in createUser service: ${err}`)
    }
}