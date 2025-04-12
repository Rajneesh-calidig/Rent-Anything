import express from 'express'
import { uploadAadharImage, uploadPanCardImage, uploadProfileImage } from '../../middleware/upload.js';
import { applyKYC, updateUserDetails, updateUserPassword, updateUserProfile } from '../../controllers/user.controller.js';

const router = express.Router();

router.put('/:id/profile',uploadProfileImage.single('profileImage'),updateUserProfile)
router.put('/:id/update',updateUserDetails)
router.put('/:id/update-password',updateUserPassword)
router.put('/:id/apply-kyc',uploadAadharImage.single('aadharCardImage'),uploadPanCardImage.single('panCardImage'),applyKYC)

export default router;