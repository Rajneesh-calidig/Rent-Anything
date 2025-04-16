import express from 'express'
import { uploadaadhaarImage, uploadPanCardImage, uploadProfileImage,uploadKYCDocuments } from '../../middleware/upload.js';
import { applyKYC, updateUserDetails, updateUserPassword, updateUserProfile } from '../../controllers/user.controller.js';
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router();

router.put('/:id/profile',uploadProfileImage.single('profileImage'),updateUserProfile)
router.put('/:id/update',updateUserDetails)
router.put('/:id/update-password',updateUserPassword)
// router.put('/:id/apply-kyc',uploadaadhaarImage.single('aadhaarCardImage'),uploadPanCardImage.single('panCardImage'),applyKYC)

// Update your Multer configuration to handle multiple files
// export const uploadKYCDocuments = multer({
//     storage: multer.diskStorage({
//       destination: (req, file, cb) => {
//         let folder = '';
//         if (file.fieldname === 'aadhaarCardImage') {
//           folder = 'aadhaarImages';
//         } else if (file.fieldname === 'panCardImage') {
//           folder = 'panCardImages';
//         }
//         const uploadPath = path.join(__dirname, '..', 'public/images', folder);
//         fs.mkdirSync(uploadPath, { recursive: true });
//         cb(null, uploadPath);
//       },
//       filename: (req, file, cb) => {
//         const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '');
//         cb(null, uniqueName);
//       }
//     }),
//     fileFilter: (req, file, cb) => {
//       // Add file validation if needed
//       cb(null, true);
//     }
//   });
  
  // Update your route to use .fields() instead of multiple .single()
  router.put(
    '/:id/apply-kyc',
    uploadKYCDocuments.fields([
      { name: 'aadhaarCardImage', maxCount: 1 },
      { name: 'panCardImage', maxCount: 1 }
    ]),
    applyKYC
  );

export default router;