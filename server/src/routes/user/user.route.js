import express from 'express'
import { uploadProfileImage,uploadKYCDocuments } from '../../middleware/upload.js';
import { applyKYC, updateUserDetails, updateUserPassword, updateUserProfile } from '../../controllers/user.controller.js';

const router = express.Router();

router.put('/:id/profile',uploadProfileImage.single('profileImage'),updateUserProfile)
router.put('/:id/update',updateUserDetails)
router.put('/:id/update-password',updateUserPassword)
router.put(
  '/:id/apply-kyc',
  uploadKYCDocuments.fields([
    { name: 'aadhaarCardImage', maxCount: 1 },
    { name: 'panCardImage', maxCount: 1 }
  ]),
  applyKYC
);

export default router;