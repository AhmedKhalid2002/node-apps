import multer, { diskStorage } from 'multer';
import { nanoid } from 'nanoid';

export const fileValidation = {
  images: ['image/png', 'image/jpeg'],
  files: ['application/pdf'],
};

export function uploadFile({ folderName ,filter}) {
  //  disk storage
  const storage = diskStorage({
    // destination: `uploads/${folderName}`,
    // filename: (req, file, cb) => {
    //   cb(null, nanoid() + '__' + file.originalname); // بتعمل rename file , save file , call next()
    // },
    
  });

  // multer
  const fileFilter = (req, res, cb) => {
    if (!filter.includes(file.mimetype)) {
      cb(new Error('Invalid format,file must be png', false));
    }
    cb(null, true);
  };
  const multerUpload = multer({ storage, fileFilter });

  return multerUpload;
}
