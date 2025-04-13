import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const createStorage = (folderName) => {
    const uploadPath = path.join(__dirname, '..', 'public/images',folderName)
    fs.mkdirSync(uploadPath,{recursive:true})

    return multer.diskStorage({
        destination:(req,file,cb) => {
            cb(null,uploadPath)
        },
        filename:(req,file,cb) => {
            const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '');
            cb(null,uniqueName)
        }
    })
}

export const uploadKYCDocuments = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        let folder = '';
        if (file.fieldname === 'aadhaarCardImage') {
          folder = 'aadhaarImages';
        } else if (file.fieldname === 'panCardImage') {
          folder = 'panCardImages';
        }
        const uploadPath = path.join(__dirname, '..', 'public/images', folder);
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '');
        cb(null, uniqueName);
      }
    }),
    fileFilter: (req, file, cb) => {
      // Add file validation if needed
      cb(null, true);
    }
  });

export const uploadProfileImage = multer({storage:createStorage('userProfile')})
export const uploadItemsImages = multer({storage:createStorage('itemImages')})
export const uploadaadhaarImage = multer({storage:createStorage('aadhaarImages')})
export const uploadPanCardImage = multer({storage:createStorage('panCardImages')});

