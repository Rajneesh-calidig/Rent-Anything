import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name:{
            type: String,
            required:true
        },
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE"
        },
        userType:{
            type: String,
            enum: ["ADMIN", "USER"],
            default: "USER"
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        mobileNumber: {
            type: String,
            required: true,
            unique: true
        },
        address: {
            type: String,
        },
        password: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;