import { User } from '../../../DB/model/user.model.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';
import cloudinary from '../../../utils/cloudnairy.js';
import { generateQRCode } from '../../../utils/qrCode.js';

export const uploadProfileImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next(new Error('No file uploaded', { cause: 400 }));
  const id = req.user._id;

  const user = await User.findByIdAndUpdate(
    id,
    { profileImage: req.file.path },
    { new: true },
  );
  if (!user) return next(new Error('User not found', { cause: 404 }));
  res.json({
    success: true,
    message: 'Profile image uploaded successfully',
    user,
  });
});

export const uploadCoverImage = asyncHandler(async (req, res, next) => {
  const id = req.user._id;
  const user = await User.findById(id);
  req.files.forEach((file) => {
    user.coverImage.push(file.path);
  });
  await user.save();

  return res.json({
    success: true,
    message: 'Cover uploaded successfully',
  });
});

export const uploadProfileImageCloud = asyncHandler(async (req, res, next) => {
  if (!req.file) return next(new Error('No file uploaded', { cause: 400 }));
  const id = req.user._id;
  const { secure_url, public_id } = cloudinary.uploader.upload(req.file.path);
  await User.findByIdAndUpdate(id, {
    profileImage: { secure_url, public_id },
  });

  res.json({
    success: true,
    message: 'Profile image uploaded successfully', // TODO
  });
});

export const profile = asyncHandler((req, res, next) => {
<<<<<<< HEAD
  const qrCode = generateQRCode(req.user);

=======
  const qrCode = generateQRCode({ data: req.user });
>>>>>>> 2f68f77 (qrcode)
  return res.json({
    success: true,
    message: 'Qrcode created successfully',
    qrCode,
  });
});
