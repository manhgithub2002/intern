import express from 'express'
import { hello } from '../controllers/user.controllers';
import multer from 'multer';
// import fs from 'fs'
import { uploadUserExcelFile } from '../middleware/uploadUser.middleware';

const router = express.Router();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       const uploadFolder = 'uploads';
      
//       // Kiểm tra và tạo thư mục "uploads" nếu nó không tồn tại
//       if (!fs.existsSync(uploadFolder)) {
//         fs.mkdirSync(uploadFolder);
//       }
  
//       cb(null, uploadFolder);
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + "-" + file.originalname);
//     },
//   });


const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.post('/upload_users', upload.single('xlsx'), uploadUserExcelFile);
router.get('/', hello)

export default router;
