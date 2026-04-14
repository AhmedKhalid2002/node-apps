import { User } from '../../../DB/model/user.model.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

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
