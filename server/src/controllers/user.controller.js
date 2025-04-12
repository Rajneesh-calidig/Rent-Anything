import User from "../models/User.js";
import fs from 'fs'
import httpStatus from "../utils/httpStatus.js";
import bcrypt from 'bcrypt'

export const updateUserProfile = async (req,res) => {
    try{
        const userId = req.params.id;
        
        const user = await User.findById(userId);
    
        if(!user){
            return res.status(404).json({error:"User Not Found!"})
        }
    
        // Delete old image if already exist
        if(req.file && user.profileImage){
            const oldImagePath = path.join(__dirname,'..','public/images/userProfile',path.basename(user.profileImage));
            if(fs.existsSync(oldImagePath)){
                fs.unlinkSync(oldImagePath);
            }
        }
    
        if(req.file){
            user.profileImage = `/public/images/userProfile/${req.file.filename}`;
        }
    
        await user.save();
    
        res.status(httpStatus.SUCCESS).json({message:"Profile Updated",user})
    }catch(err){
        console.error(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error:'server error!'})
    }
}

export const updateUserDetails = async (req,res) => {
    try {
        const userId = req.params.id;

        const { name, email, phone, address } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (name) user.name = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (address) user.address = address;

        const updatedUser = await user.save();

        res.status(200).json({
            message: 'User updated successfully',
            user: {
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            address: updatedUser.address
            }
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
}

export const updateUserPassword = async (req,res) => {
    try {
        const userId = req.params.id;
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await user.matchPassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword,salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
}

export const applyKYC = async (req,res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (req.file) {
            if (req.file.fieldname === 'aadharCardImage') {
            user.aadharCardImage = `/public/images/aadharImages/${req.file.filename}`;
            } else if (req.file.fieldname === 'panCardImage') {
            user.panCardImage = `/public/images/panCardImages/${req.file.filename}`;
            }
        }

        if (req.body.aadharCardNumber) {
            user.aadharCardNumber = req.body.aadharCardNumber;
        }

        if (req.body.panCardNumber) {
            user.panCardNumber = req.body.panCardNumber;
        }

        await user.save();
        res.status(200).json({ message: 'Documents uploaded successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}