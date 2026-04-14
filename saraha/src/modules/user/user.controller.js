import { asyncHandler } from '../../../utils/asyncHandler.js';

export const uploadProfileImage = asyncHandler(async (req,res,next) => {
    if (!req.file) return next(new Error('No file uploaded', { cause: 400 }));
});
