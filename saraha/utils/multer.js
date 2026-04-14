import multer, { diskStorage } from 'multer';
import { nanoid } from 'nanoid';

export function uploadFile({folderName}) {
  //  disk storage
  const storage = diskStorage({
    destination: `uploads/${folderName}`,
    filename: (req, file, cb) => {
      cb(null, nanoid() + '__' + file.originalname); // بتعمل rename file , save file , call next()
    },
  });

  // multer

  const multerUpload = multer({ storage });

  return multerUpload;
}
